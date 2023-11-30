const router = require('express').Router();


const incomeRoutes = require('./income-routes');
const expenseRoutes = require('./expense-routes');

router.use('/income', incomeRoutes);
router.use('/expense', expenseRoutes);

const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);


module.exports = router;
