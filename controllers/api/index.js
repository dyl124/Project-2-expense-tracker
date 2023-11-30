const router = require('express').Router();
// const routeOne = require('./routeOne');
// const routeTwo = require('./routeTwo');

router.use('/landingPage', landingPage);

 router.use('/dashboard', dashboard);

module.exports = router;
