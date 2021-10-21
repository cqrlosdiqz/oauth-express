const { connect } = require('mongoose');

const URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/oauth_express';

connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((_) => console.log('Connect to MongoDB'))
  .catch((err) => console.error(err));
