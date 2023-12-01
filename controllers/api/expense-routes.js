const router = require('express').Router();
const { User, Expense, ExpenseType, Vendor } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Use req.session.user_id to get the currently logged-in user's ID
    const userId = req.session.user_id;

    // Find the user
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch Expense data along with associated models - LATER WILL SELECT WHAT I WANT
    const expenseData = await Expense.findAll({
      where: {
        user_id: userId,
      },
      include: [
        { model: ExpenseType },
        { model: Vendor },
      ],
    });

    res.status(200).json({
      user: user.toJSON(),
      expenseData: expenseData.map((expense) => expense.toJSON()),
    });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;