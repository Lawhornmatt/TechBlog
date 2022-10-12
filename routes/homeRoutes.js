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

// GET to render the dashboard, showing only that user's posts and a button to make a new post
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

    res.render('dashboard', {
      logged_in: req.session.logged_in,
      edittedpostData
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

  // ====================
  //  /POST
  // ====================

// GET to render the write-a-post form
router.get('/post', withAuth, (req, res) => {
  try {
    res.render('post', {
      logged_in: req.session.logged_in,
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to post to create a new post for that user
router.post('/post', async (req, res) => {
  console.log(`\x1b[32m Data: ${JSON.stringify(req.body)}\x1b[0m`);
  try {
     
      const postData = await Post.create({
        userid: req.session.user_id,
        posttitle: req.body.postTitle,
        postbody: req.body.postBody
      });

      if (!postData) {
          res
              .status(400)
              .json({ status: 'error', message: 'Failed to create new postData' })
          return
      };

      req.session.save(() => {
        res.json({ status: 'ok', message: `\x1b[32m New Post: '${postData.posttitle}' is created\x1b[0m`})
      });
      console.log(`\x1b[32m New Post: '${postData.posttitle}' is created\x1b[0m`);
  } catch (err) {
      res.status(404).json(err);
  }
});

  // ====================
  //  /POST INDIVIDUAL
  // ====================

// GET to retreive a specific post and it's comments
router.get('/post/:id', async (req, res) => {
  try {

    // Get data of that individual post. Include user data
    const rawpostData = await Post.findOne({
      include: [
        { model: User,
          attributes: ['username']
        }
      ],
      where: {
        id: req.params.id
      }
    });

    // Get rid of trash data from that post data
    const allpostData = rawpostData.get({ plain: true });

    // Make the user data "handlebars palletable"
    // Basically, user comes as an object and we want a plain name for comparisons / display
    const edittedpostData = {
      id: allpostData.id,
      userid: allpostData.userid,
      user: allpostData.user.username,
      posttitle: allpostData.posttitle,
      postbody: allpostData.postbody,
      createdAt: allpostData.createdAt,
      updatedAt: allpostData.updatedAt,
      sess_username: req.session.username
    };

    // Same deal with comments, get all comments with matching post ID & the user data
    const rawcommentData = await Comment.findAll({
      include: [
        { model: User,
          attributes: ['username']
        }
      ],
      where: {
        postid: req.params.id
      }
    });

    const commentData = rawcommentData.map((comment) => comment = {

      id: comment.id,
      commenterid: comment.userid,
      commenter: comment.user.username,
      opid: allpostData.userid,
      sess_username: req.session.username,
      commentbody: comment.commentbody,
      updatedAt: comment.updatedAt
    });
    
    console.log(`\x1b[46m commentData: ${JSON.stringify(commentData)}\x1b[0m`);
    console.log(`\x1b[32m edittedpostData: ${JSON.stringify(edittedpostData)}\x1b[0m`);
    console.log(`\x1b[34m Current User: ${req.session.username}\x1b[0m`);

    res.render('viewPost', {
      logged_in: req.session.logged_in,
      edittedpostData,
      commentData
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to post to create a new post for that user
router.post('/post/:id', async (req, res) => {
  console.log(`\x1b[32m Data: ${JSON.stringify(req.body)}\x1b[0m`);
  try {
     
      const postData = await Post.create({
        userid: req.session.user_id,
        posttitle: req.body.postTitle,
        postbody: req.body.postBody
      });

      if (!postData) {
          res
              .status(400)
              .json({ status: 'error', message: 'Failed to create new postData' })
          return
      };

      req.session.save(() => {
        res.json({ status: 'ok', message: `\x1b[32m New Post: '${postData.posttitle}' is created\x1b[0m`})
      });
      console.log(`\x1b[32m New Post: '${postData.posttitle}' is created\x1b[0m`);
  } catch (err) {
      res.status(404).json(err);
  }
});

  // ====================
  //  /COMMENT
  // ====================

// GET to render the write-a-comment form
router.get('/comment', withAuth, (req, res) => {
  try {
    res.render('comment', {
      logged_in: req.session.logged_in,
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to comment to create a new comment for that post
router.post('/comment', async (req, res) => {
  console.log(`\x1b[32m Data: ${JSON.stringify(req.body)}\x1b[0m`);
  try {
     
      const postData = await Comment.create({
        userid: req.session.user_id,
        posttitle: req.body.postTitle,
        postbody: req.body.postBody
      });

      if (!postData) {
          res
              .status(400)
              .json({ status: 'error', message: 'Failed to create new postData' })
          return
      };

      req.session.save(() => {
        res.json({ status: 'ok', message: `\x1b[32m New Post: '${postData.posttitle}' is created\x1b[0m`})
      });
      console.log(`\x1b[32m New Post: '${postData.posttitle}' is created\x1b[0m`);
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