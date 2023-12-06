const router = require('express').Router();
const { User, Expense, ExpenseType, Vendor } = require('../../models');
const withAuth = require('../../utils/auth');
// Import the sequelize object and the Op module from sequelize to allow for advanced operators like BETWEEN
const { Op } = require('sequelize');

// ________________________________________EXPENSE ROUTES____________________________________________
// i.e. /api/expense - see income-routes.js for examples and comments on how these routes work
// These routes have been copied from income-routes.js
// and modified for expenses by changing IncomeType and Client Model references to ExpenseType and Vendor resp.

router.get('/', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let whereClause = {
      user_id: userId,
    };

    if (req.query.invoice_id) {
      whereClause.invoice_id = req.query.invoice_id;
    }

    if (req.query.start_issue_date && req.query.end_issue_date) {
      whereClause.issue_date = {
        [Op.between]: [
          new Date(req.query.start_issue_date),
          new Date(req.query.end_issue_date),
        ],
      };
    }

    if (req.query.start_due_date && req.query.end_due_date) {
      whereClause.due_date = {
        [Op.between]: [
          new Date(req.query.start_due_date),
          new Date(req.query.end_due_date),
        ],
      };
    }

    if (req.query.expense_type) {
      whereClause.type_id = req.query.expense_type;
    }

    if (req.query.vendor) {
      whereClause.vendor_id = req.query.vendor;
    }

    if (req.query.payment_status) {
      whereClause.payment_status = req.query.payment_status;
    }

    const expenseData = await Expense.findAll({
      where: whereClause,
      include: [{ model: ExpenseType }, { model: Vendor }],
      order: req.query.sort
        ? [[req.query.sort, req.query.order || 'ASC']]
        : undefined,
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

router.post('/addexpense', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    req.body.user_id = userId;
    const newExpense = await Expense.create(req.body);
    res.status(201).json(newExpense);
  } catch (err) {
    console.error('Error creating new expense entry:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const expenseId = req.params.id;
    const userId = req.session.user_id;
    const updatedExpense = await Expense.update(req.body, {
      where: {
        id: expenseId,
        user_id: userId,
      },
    });

    if (!updatedExpense[0]) {
      return res
        .status(404)
        .json({ message: 'No expense entry found with this id for this user' });
    }

    res.status(200).json({ message: 'Expense entry updated successfully' });
  } catch (err) {
    console.error('Error updating expense entry:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const expenseId = req.params.id;
    const userId = req.session.user_id;
    const deletedExpense = await Expense.destroy({
      where: {
        id: expenseId,
        user_id: userId,
      },
    });

    if (!deletedExpense) {
      return res
        .status(404)
        .json({ message: 'No expense entry found with this id for this user' });
    }

    res.status(200).json({ message: 'Expense entry deleted successfully' });
  } catch (err) {
    console.error('Error deleting expense entry:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ________________________________________EXPENSE TYPE ROUTES____________________________________________
// i.e. /api/expense/type

router.get('/type', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const expenseTypes = await ExpenseType.findAll({
      where: {
        user_id: userId,
      },
    });
    res.status(200).json(expenseTypes);
  } catch (err) {
    console.error('Error fetching expense types:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/type', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    req.body.user_id = userId;
    const newExpenseType = await ExpenseType.create(req.body);
    res.status(201).json(newExpenseType);
  } catch (err) {
    console.error('Error creating new expense type:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/type/:id', withAuth, async (req, res) => {
  try {
    const expenseTypeId = req.params.id;
    const userId = req.session.user_id;
    const updatedExpenseType = await ExpenseType.update(req.body, {
      where: {
        id: expenseTypeId,
        user_id: userId,
      },
    });
    if (!updatedExpenseType[0]) {
      return res
        .status(404)
        .json({ message: 'No expense type found with this id for this user' });
    }
    res.status(200).json({ message: 'Expense type updated successfully' });
  } catch (err) {
    console.error('Error updating expense type:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/type/:id', withAuth, async (req, res) => {
  try {
    const expenseTypeId = req.params.id;
    const userId = req.session.user_id;
    const deletedExpenseType = await ExpenseType.destroy({
      where: {
        id: expenseTypeId,
        user_id: userId,
      },
    });
    if (!deletedExpenseType) {
      return res
        .status(404)
        .json({ message: 'No expense type found with this id for this user' });
    }
    res.status(200).json({ message: 'Expense type deleted successfully' });
  } catch (err) {
    console.error('Error deleting expense type:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ________________________________________VENDOR ROUTES____________________________________________
// i.e. /api/expense/vendor

router.get('/vendor', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const vendors = await Vendor.findAll({
      where: {
        user_id: userId,
      },
    });
    res.status(200).json(vendors);
  } catch (err) {
    console.error('Error fetching vendors:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/vendor', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    req.body.user_id = userId;
    const newVendor = await Vendor.create(req.body);
    res.status(201).json(newVendor);
  } catch (err) {
    console.error('Error creating new vendor:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/vendor/:id', withAuth, async (req, res) => {
  try {
    const vendorId = req.params.id;
    const userId = req.session.user_id;
    const updatedVendor = await Vendor.update(req.body, {
      where: {
        id: vendorId,
        user_id: userId,
      },
    });
    if (!updatedVendor[0]) {
      return res
        .status(404)
        .json({ message: 'No vendor found with this id for this user' });
    }
    res.status(200).json({ message: 'Vendor updated successfully' });
  } catch (err) {
    console.error('Error updating vendor:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/vendor/:id', withAuth, async (req, res) => {
  try {
    const vendorId = req.params.id;
    const userId = req.session.user_id;
    const deletedVendor = await Vendor.destroy({
      where: {
        id: vendorId,
        user_id: userId,
      },
    });
    if (!deletedVendor) {
      return res
        .status(404)
        .json({ message: 'No vendor found with this id for this user' });
    }
    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (err) {
    console.error('Error deleting vendor:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
