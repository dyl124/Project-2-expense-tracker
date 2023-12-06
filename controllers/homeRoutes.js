const router = require('express').Router();
const {
  User,
  Income,
  IncomeType,
  Client,
  Expense,
  ExpenseType,
  Vendor,
} = require('../models');
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

    // Fetch all expense data from API for table in expenseTable partial
    const expenseData = await Expense.findAll({
      where: {
        user_id: req.session.user_id, // Make sure only the currently logged-in user's data is fetched.
      },
      include: [{ model: ExpenseType }, { model: Vendor }],
    });
    const expenses = expenseData.map((expense) => expense.get({ plain: true }));

    // function to also send the total income amount to the dashboard. Updated amount is handled in public/js/dashboard.js
    let incomeSumAmount = 0;
    incomes.forEach((income) => {
      // for each income object, add the amount to the incomeSumAmount variable and return as a float with 2 decimal places
      incomeSumAmount += parseFloat(income.amount);
    });

    // function to also send the total expense amount to the dashboard. Updated amount is handled in public/js/dashboard.js
    let expenseSumAmount = 0;
    expenses.forEach((expense) => {
      // for each expense object, add the amount to the expenseSumAmount variable and return as a float with 2 decimal places
      expenseSumAmount += parseFloat(expense.amount);
    });

    // function to check for any incomes that are overdue (payment_status=false, due_date < today's date):
    let outstandingIncomesCount = 0;
    incomes.forEach((income) => {
      // if income payment_status is false and due_date is before today's date, increment outstandingIncomesCount
      if (!income.payment_status && new Date(income.due_date) < new Date()) {
        outstandingIncomesCount++;
      }
    });

    // function to check for any expenses that are overdue (payment_status=false, due_date < today's date):
    let outstandingExpensesCount = 0;
    expenses.forEach((expense) => {
      // if expense payment_status is false and due_date is before today's date, increment outstandingExpensesCount
      if (!expense.payment_status && new Date(expense.due_date) < new Date()) {
        outstandingExpensesCount++;
      }
    });

    // pass the income data, expense data, sumAmounts, and outstanding counts to the dashboard template for rendering the table
    res.render('dashboard', {
      logged_in: req.session.logged_in,
      incomes,
      expenses,
      // pass sumAmounts as 2 decimal-place floats
      incomeSumAmount: incomeSumAmount.toFixed(2),
      expenseSumAmount: expenseSumAmount.toFixed(2),
      // pass outstanding booleans to dashboard
      hasOutstandingIncomes: outstandingIncomesCount > 0,
      hasOutstandingExpenses: outstandingExpensesCount > 0,
      // pass counts to dashboard
      outstandingIncomesCount,
      outstandingExpensesCount,
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
