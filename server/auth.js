import express from 'express';
import bodyParser from 'body-parser';
import storage from '../test.json';

const path = require('path');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.sendFile(path.join(__dirname, '../login.html'));
  }
});
router.post('/login', (req, res) => {
  console.log(`${req.body.username} is trying to login.(auth.js)`);
  const userData = storage.user.find(item => (item.username === req.body.username));
  if (userData && (req.body.password === userData.password)) {
    console.log('Username and password match.');
    req.logIn(userData, () => {
      res.redirect('/');
    });
  } else {
    res.redirect('/login');
  }
});
router.get('/logout', (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    console.log(`${req.user.username} logout.(auth.js)`);
    next();
  }
}, (req, res) => {
  delete req.session;
  res.clearCookie('caltcha-sid');
  req.logOut();
  res.redirect('/login');
});

module.exports = router;
