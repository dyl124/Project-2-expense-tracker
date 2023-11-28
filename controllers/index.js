const router = require('express').Router();
const dashboard = require('./api/dashboard');
const landingPage = require('./api/landingPage')

router.use('/api', dashboard);
router.use('/api', landingPage);

module.exports = router;
