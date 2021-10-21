const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/User');

const twitterStrategy = new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://localhost:8080/api/auth/twitter/callback',
    includeEmail: true,
  },
  async (token, tokenSecret, profile, done) => {
    console.log(profile);
    const { id: social_id, displayName } = profile;

    try {
      const user = await User.findOne({ social_id });
      if (user) {
        return done(null, user);
      }
      const newUser = await User.create({
        social_id,
        name: displayName,
        email: profile.emails[0].value,
        provider: 'twitter',
      });
      return done(null, newUser);
    } catch (error) {
      console.log(error);
      return done(error);
    }
  }
);

module.exports = twitterStrategy;
