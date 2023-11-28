const router = require('express').Router();
const landingPage = require('./landingPage');
const dashboard = require('./dashboard');

router.use('/landingPage', landingPage);

 router.use('/dashboard', dashboard);

module.exports = router;
