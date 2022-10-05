const router = require('express').Router();
const withAuth = require('../utils/auth');
const {Generic} = require('../models');
const bcrypt = require('bcrypt')


router.get('/', withAuth, async (req, res) => {
  try {
    res.render('home', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/about', async (req, res) => {
  try {
    res.render('about', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  try {
    res.render('login');
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;