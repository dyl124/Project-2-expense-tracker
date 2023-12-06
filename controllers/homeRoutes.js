const router = require('express').Router();
const { User, Income, IncomeType, Client, Expense } = require('../models');
const withAuth = require('../utils/auth');

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Fetch the all income data from API for table in incomeTable partial
    const incomeData = await Income.findAll({
      where: {
        user_id: req.session.user_id, // Make sure only the currently logged-in user's data is fetched.
      },
      include: [{ model: IncomeType }, { model: Client }],
    });
    const incomes = incomeData.map((income) => income.get({ plain: true }));

    // function to also send the total income amount to the dashboard. Updated amount is handled in public/js/dashboard.js
    let sumAmount = 0;
    incomes.forEach((income) => {
      // for each income object, add the amount to the sumAmount variable and return as a float with 2 decimal places
      sumAmount += parseFloat(income.amount);
    });

    // function to check for any incomes that are overdue (payment_status=false, due_date < today's date):
    let outstandingIncomesCount = 0;
    incomes.forEach((income) => {
      // if income payment_status is false and due_date is before today's date, increment outstandingIncomesCount
      if (!income.payment_status && new Date(income.due_date) < new Date()) {
        outstandingIncomesCount++;
      }
    });

    // pass the income data and sumAmount to the dashboard template for rendering the table
    res.render('dashboard', {
      logged_in: req.session.logged_in,
      incomes,
      // pass sumAmount as 2 decimal-place float
      sumAmount: sumAmount.toFixed(2),
      // pass outstanding boolean to dashboard
      hasOutstandingIncomes: outstandingIncomesCount > 0,
      // pass count to dashboard
      outstandingIncomesCount,
      //
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Redirect to dashboard if user is already logged in
router.get('/', (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/dashboard');
    } else {
      res.render('homepage', { logged_in: req.session.logged_in });
    }
  } catch (err) {
    console.error(err); // Log error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
