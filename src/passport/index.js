const passport = require('passport');
const User = require('../models/User');


passport.use('local-signin', require('./local-strategy').localSignin);
passport.use('local-signup', require('./local-strategy').localSingup);
passport.use('github', require('./github-strategy'));
passport.use('google', require('./google-strategy'));
passport.use('twitter', require('./twitter-strategy'));
passport.use('facebook', require('./facebook-strategy'));

passport.serializeUser(function (user, done) {
  console.log({ serializeUser: user });
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    console.log({ deserializeUser: user });
    done(err, user);
  });
});

module.exports = passport;
