import express from 'express';
import storage from '../test.json';

const path = require('path');

const router = express.Router();

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../login.html'));
});
router.post('/login', (req, res) => {
  console.log(`${req.body.username} is trying to login.(auth.js)`);
  const user = storage.team.members.find(item => (item === req.body.username));
  if (user) {
    req.logIn(user, () => {
      res.redirect('/');
    });
  } else {
    res.redirect('/login');
  }
});
router.get('/logout', (req, res) => {
  console.log(`${req.user} logout.(auth.js)`);
  req.logOut();
  res.redirect('/login');
});

module.exports = router;
