const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.use('/api/users', require('./users'));
router.use('/api/auth', require('./auth'));

module.exports = router;
