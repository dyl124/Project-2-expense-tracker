const router = require('express').Router();

const incomeRoutes = require('./income-routes');
const expenseRoutes = require('./expense-routes');

router.use('/income', incomeRoutes);
router.use('/expense', expenseRoutes);

module.exports = router;
