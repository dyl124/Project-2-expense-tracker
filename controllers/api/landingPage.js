const router = require('express').Router();
const {User} = require('../../models');
const bcrypt = require('bcrypt'); 



router.post('/landingPage', async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
      }
  
      const newUserData = await User.findOne({ where: { email: req.body.email } });
  
      if (!newUserData) {
        res.status(404).json({ message: 'Invalid email. Please try again!' });
        return;
      }
  
      const validPassword = await bcrypt.compare(req.body.password, newUserData.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Invalid password. Please try again!' });
        return;
      }
  
      res.status(200).json({ message: 'You are now logged in!' });
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
});
router.post('/dashboard', async (req, res) => {
    try {
      const newUserData = await User.create(req.body);
      res.status(200).json(newUserData);
    }
    
    catch (err) {
      res.status(400).json(err);
    }
  });
  


module.exports = router;
