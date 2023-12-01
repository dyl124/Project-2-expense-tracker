// THis is my version with changes from Dylan's - May need to fix conflicts later
const router = require('express').Router();
const { User } = require('../../models');

// Render the login page - separate from the login form submission (this should be a get request)
// TODO - serve other pages (register/sign-up, etc.)
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle login form submissions as a post request
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/register', async (req, res) => {
  try {
    const newUser = await User.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
