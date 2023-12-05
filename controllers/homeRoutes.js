const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    res.render('dashboard', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Redirect to homepage if user is already logged in
router.get('/login', (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/');
    } else {
      res.render('login', { logged_in: req.session.logged_in });
    }
  } catch (err) {
    console.error(err); // Log error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Redirect to homepage if user is already logged in
router.get('/register', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/');
    } else {
      res.render('register', { logged_in: req.session.logged_in });
    }
  } catch (err) {
    console.error(err); // Log error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
