const User = require('../models/user');

module.exports.signup = (req, res, next) => {
  res.render('passport/signup');
}
