const FaceBookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

const facebookStrategy = new FaceBookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:8080/api/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ social_id: profile.id });
      if (user) {
        return done(null, user);
      }

      const newUser = new User({
        social_id: profile.id,
        name: profile.displayName,
        email: profile?.emails[0].value,
        provider: 'facebook',
      });

      await newUser.save();
      return done(null, newUser);
    } catch (err) {
      done(err);
    }
  }
);

module.exports = facebookStrategy;
