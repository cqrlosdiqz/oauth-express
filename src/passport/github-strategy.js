const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

const githubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/api/auth/github/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    const { id: social_id, displayName, emails } = profile;
    const { value: email } = emails[0];

    const user = await User.findOne({ social_id });
    if (user) {
      return done(null, user);
    } else {
      const newUser = new User({
        social_id,
        email,
        name: displayName,
        provider: 'github',
      });
      await newUser.save();
      return done(null, newUser);
    }
  }
);

module.exports = githubStrategy;
