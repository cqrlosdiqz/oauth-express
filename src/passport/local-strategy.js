const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

const localSingup = new LocalStrategy(
  {
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true, // allows us to pass back the entire request to the callback
  },
  function (req, email, password, done) {
    const { name } = req.body;

    User.findOne({ email }, function (err, user) {
      if (err) return done(err);

      if (user) {
        return done(
          null,
          false,
          req.flash('signupMessage', 'That email is already taken.')
        );
      } else {
        const newUser = new User({
          name,
          email,
          password: User.generateHash(password),
        });
        newUser.save(function (err) {
          if (err) throw err;
          return done(null, newUser);
        });
      }
    });
  }
);

const localSignin = new LocalStrategy(
  {
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true, // allows us to pass back the entire request to the callback
  },
  function (req, email, password, done) {

    User.findOne({ email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      req.user = user;
      return done(null, user);
    });
  }
);

module.exports = {
  localSignin,
  localSingup,
};
