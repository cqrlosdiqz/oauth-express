const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/api/auth/google/callback',
    passReqToCallback: true,
 
  },
  async (request, accessToken, refreshToken, profile, done) => {
    const { id: social_id, displayName, emails } = profile;
    const { value: email } = emails[0];

    const user = await User.findOne({ social_id });
    if (user) {
      done(null, user);
    }
    const newUser = new User({
      social_id,
      name: displayName,
      email,
      provider: 'google',
    });
    await newUser.save();
    done(null, newUser);
  }
);

module.exports = googleStrategy;
