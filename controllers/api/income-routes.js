// Need to test implementation of this API - could possibly serve all GET requests for income data, regardless of how much/what data is requested 
// (e.g. all income data, or income data for a specific invoice, or income data for a specific invoice and client, etc.)

const router = require('express').Router();
const { User, Income, IncomeType, Client } = require('../../models');
const withAuth = require('../../utils/auth');
// Import the sequelize object and the Op module from sequelize to allow for advanced operators like BETWEEN
const { Op } = require('sequelize');

router.get('/', withAuth, async (req, res) => {
  try {
    // Use req.session.user_id to get the currently logged-in user's ID
    const userId = req.session.user_id;

    // Find the user
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Define a where clause for the query
    let whereClause = {
      user_id: userId,
    };

    // If invoice_id is provided, add it to the where clause
    if (req.query.invoice_id) {
      whereClause.invoice_id = req.query.invoice_id;
    }

    // If issue_date range is provided, add it to the where clause
    if (req.query.startIssueDate && req.query.endIssueDate) {
      whereClause.issue_date = {
        [Op.between]: [new Date(req.query.startIssueDate), new Date(req.query.endIssueDate)],
      };
    }

    // If due_date range is provided, add it to the where clause
    if (req.query.startDueDate && req.query.endDueDate) {
      whereClause.due_date = {
        [Op.between]: [new Date(req.query.startDueDate), new Date(req.query.endDueDate)],
      };
    }

    // If income type is provided, add it to the where clause
    if (req.query.incomeType) {
      whereClause.incomeType = req.query.incomeType;
    }

    // If client is provided, add it to the where clause
    if (req.query.client) {
      whereClause.client = req.query.client;
    }

    // If payment status is provided, add it to the where clause
    if (req.query.paymentStatus) {
      whereClause.paymentStatus = req.query.paymentStatus;
    }

    const incomeData = await Income.findAll({
      where: whereClause,
      include: [
        { model: IncomeType },
        { model: Client },
      ],
      // Used to sort by results. If sortBy is provided, sort by that ccolumn in the order provided (if not provided, default to ASC); if no sortBy is provided, don't sort
      order: req.query.sortBy ? [[req.query.sortBy, req.query.order || 'ASC']] : undefined,
    });

    res.status(200).json({
      user: user.toJSON(),
      incomeData: incomeData.map((income) => income.toJSON()),
    });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
  // should now be able to make queries like api/income?sortBy=due_date&order=DESC and api/income?startDueDate=2022-01-01&endDueDate=2022-12-31
});

router.post('/', withAuth, async (req, res) => {
  try {
    // Use req.session.user_id to get the currently logged-in user's ID
    const userId = req.session.user_id;

    // Add the user_id to the request body
    req.body.user_id = userId;

    // Create a new income record
    const newIncome = await Income.create(req.body);

    // Send a success-created response
    res.status(201).json(newIncome);
  } catch (err) {
    console.error('Error creating new income entry:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Still need to work out how we want to implement this on the front end.
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Use req.params.id to get the ID of the income entry to be updated
    const incomeId = req.params.id;

    // Use req.session.user_id to get the currently logged-in user's ID
    const userId = req.session.user_id;

    // Update the income record
    const updatedIncome = await Income.update(req.body, {
      where: {
        id: incomeId,
        user_id: userId, // Ensure the income entry belongs to the currently logged-in user
      },
    });

    // If no income entry was found with the provided ID and user_id, send a 404 response
    if (!updatedIncome[0]) {
      return res.status(404).json({ message: 'No income entry found with this id for this user' });
    }

    // Send a success response
    res.status(200).json({ message: 'Income entry updated successfully' });
  } catch (err) {
    console.error('Error updating income entry:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Need to confirm what happens to the related models when an income entry is deleted
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Use req.params.id to get the ID of the income entry to be deleted
    const incomeId = req.params.id;

    // Use req.session.user_id to get the currently logged-in user's ID
    const userId = req.session.user_id;

    // Delete the income record
    const deletedIncome = await Income.destroy({
      where: {
        id: incomeId,
        user_id: userId, // Ensure the income entry belongs to the currently logged-in user
      },
    });

    // If no income entry was found with the provided ID and user_id, send a 404 response
    if (!deletedIncome) {
      return res.status(404).json({ message: 'No income entry found with this id for this user' });
    }

    // Send a success response
    res.status(200).json({ message: 'Income entry deleted successfully' });
  } catch (err) {
    console.error('Error deleting income entry:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
