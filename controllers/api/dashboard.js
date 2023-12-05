const router = require('express').Router();
const { User, Expense, ExpenseType, Vendor, Income, IncomeType } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Use req.session.user_id to get the currently logged-in user's ID
    const userId = req.session.user_id;

    // Find the user
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const whereClause = { userId: user.id }; // Adjust this based on your model structure

    const allRelatedUserData = await Income.findAll({
      where: whereClause,
      include: [
        { model: Expense },
        { model: IncomeType },
        { model: ExpenseType },
        { model: Vendor },
      ],
    });

    res.status(200).json({ data: allRelatedUserData, message: 'Successful' });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
