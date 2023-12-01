const router = require('express').Router();
const { User, Income, IncomeType, Client } = require('../../models');
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

    // Fetch income data along with associated models - LATER WILL SELECT WHAT I WANT
    const incomeData = await Income.findAll({
      where: {
        user_id: userId,
      },
      include: [
        { model: IncomeType },
        { model: Client },
      ],
    });

    res.status(200).json({
      user: user.toJSON(),
      incomeData: incomeData.map((income) => income.toJSON()),
    });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
