const router = require('express').Router();
const passport = require('../passport');

//------Local------
router.post(
  '/signup',
  passport.authenticate('local-signup', {
    successRedirect: '/login', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true, // allow flash messages
  })
);

router.post(
  '/signin',
  passport.authenticate('local-signin', {
    successRedirect: '/api/users/profile',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

//------Github------
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: '/api/users/profile',
    failureRedirect: '/login',
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log('exito');
  }
);

//------Google------
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log('exito');
    res.redirect('/');
  }
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/api/users/profile',
    failureRedirect: '/login',
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log('exito');
  }
);

//------Twitter------
router.get('/twitter', passport.authenticate('twitter'));

router.get(
  '/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/api/users/profile',
    failureRedirect: '/login',
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log('exito');
  }
);

//------Facebook------
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/api/users/profile',
    failureRedirect: '/login',
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);
//---Logout---
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
