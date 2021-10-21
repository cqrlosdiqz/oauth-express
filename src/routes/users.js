const router = require('express').Router();
const { checkAuthentication } = require('../middlewares/checkAuthentication');

router.get('/profile', [checkAuthentication], (req, res, next) => {
  res.render('profile', { user: req.user });
});

module.exports = router;
