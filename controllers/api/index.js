const router = require('express').Router();

const incomeRoutes = require('./income-routes');
const expenseRoutes = require('./expense-routes');
const dashBoard = require('./dashboard');
router.use('/income', incomeRoutes);
router.use('/expense', expenseRoutes);
router.use('/dash', dashBoard);


module.exports = router;
