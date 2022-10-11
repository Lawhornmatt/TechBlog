const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Post, Comment } = require('../models');
const bcrypt = require('bcrypt');


router.get('/', async (req, res) => {
  try {

    const rawpostData = await Post.findAll({
      include: [{
        model: User,
        attributes: ['username']
      }]
    });
    const allpostData = rawpostData.map((post) => post.get({ plain: true }));

    const edittedpostData = allpostData.map((post) => post = {
      id: post.id,
      userid: post.userid,
      posttitle: post.posttitle,
      postbody: post.postbody,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      user: post.user,
      sess_username: req.session.username
    });

    console.log(`\x1b[32m edittedpostData: ${JSON.stringify(edittedpostData)}\x1b[0m`);
    console.log(`\x1b[34m Current User: ${req.session.username}\x1b[0m`);

    res.render('home', {
      logged_in: req.session.logged_in,
      edittedpostData
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

  // ====================
  //  /LOGIN
  // ====================

// GET to render the login AND signup form
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

// POST to authenticate and log-in the user
router.post('/login', async (req, res) => {
  console.log(`\x1b[32m Data: ${JSON.stringify(req.body)}\x1b[0m`);
  try {
      const username = req.body.username;
      const password = req.body.password;

      //find if name exists in db
      const userData = await User.findOne({
          where: {
              username: username,
          }
      });

      if (!userData) {
          res
              .status(400)
              .json({ status: 'error', message: 'User with that username cannot be found' })
          return
      };

      if (await bcrypt.compare(password, userData.password) === false) {
          res.json({ status: 'error', message: 'Password Invalid, Cannot Authenticate' })
      };

      req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.username = userData.username;
          req.session.logged_in = true;

          res.json({ status: 'ok', message: `${userData.username} is logged in!` })
      });
      // console.log(`\x1b[32mUser: ${req.session.user_id} has logged in`);
      console.log(`\x1b[32mUser: ${req.body.username} has logged in\x1b[0m`);
  } catch (err) {
      res.status(404).json(err);
  }
});

  // ====================
  //  /LOGOUT
  // ====================

// POST which destroys the session, logging out the user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
      req.session.destroy(() => {
          res.json({ message: 'Logged out' })
          res.status(204).end();
          console.log('Session Destroyed');
      });
  } else {
      res.status(404).end();
  }
});

  // ====================
  //  /SIGNUP
  // ====================

// POST which creates a new user in the database and returns one to the home page
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;

        res.json({ status: 'ok', message: `Welcome, ${userData.first_name}, to my TechBlog` })
    });
} catch (err) {
    res.status(400).json(err);
}
});

  // ====================
  //  /DASHBOARD
  // ====================

// GET to render the dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {

    const rawpostData = await Post.findAll({
      include: [{
        model: User,
        attributes: ['username']
      }],
      where: {
        userid: req.session.user_id
      }
    });
    const allpostData = rawpostData.map((post) => post.get({ plain: true }));

    const edittedpostData = allpostData.map((post) => post = {
      id: post.id,
      userid: post.userid,
      posttitle: post.posttitle,
      postbody: post.postbody,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      user: post.user,
      sess_username: req.session.username
    });

    console.log(`\x1b[32m edittedpostData: ${JSON.stringify(edittedpostData)}\x1b[0m`);
    console.log(`\x1b[34m Current User: ${req.session.username}\x1b[0m`);

    res.render('home', {
      logged_in: req.session.logged_in,
      edittedpostData
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to authenticate and log-in the user
router.post('/dashboard', async (req, res) => {
  console.log(`\x1b[32m Data: ${JSON.stringify(req.body)}\x1b[0m`);
  try {
      const username = req.body.username;
      const password = req.body.password;

      //find if name exists in db
      const userData = await User.findOne({
          where: {
              username: username,
          }
      });

      if (!userData) {
          res
              .status(400)
              .json({ status: 'error', message: 'User with that username cannot be found' })
          return
      };

      if (await bcrypt.compare(password, userData.password) === false) {
          res.json({ status: 'error', message: 'Password Invalid, Cannot Authenticate' })
      };

      req.session.save(() => {
          req.session.username = userData.username;
          req.session.logged_in = true;

          res.json({ status: 'ok', message: `${userData.username} is logged in!` })
      });
      // console.log(`\x1b[32mUser: ${req.session.user_id} has logged in`);
      console.log(`\x1b[32mUser: ${req.body.username} has logged in\x1b[0m`);
  } catch (err) {
      res.status(404).json(err);
  }
});

  // ====================
  //  /ABOUT
  // ====================

// GET to render the about page
router.get('/about', async (req, res) => {
  try {
    res.render('about', {
      logged_in: req.session.logged_in,
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;