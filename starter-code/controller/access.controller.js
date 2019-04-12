const User = require('../models/user');
const passport = require('passport');
// get
module.exports.signup = (req, res, next) => {
  res.render('passport/signup');
}
module.exports.login = (req, res, next) => {
  res.render('passport/login');
}

//POST
module.exports.doSignup = (req, res, next) =>{
  function renderWithErrors(errors) {
    res.render('passport/signup', {
      user: req.body,
      errors: errors
    })
  }

  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) { 
        renderWithErrors({ username: 'Username already been in use'})
      } else {
        user = new User(req.body);
        return user.save()
          .then(user => res.redirect('/login'))
          //.then(res.redirect('/login)) //it works??
          //.catch(next) // Where is it?
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors)
      } else {
        next(error);
      }
    });

}

module.exports.doLogin = (req, res, next) => {
  passport.authenticate('local-auth', (error, user, validation) => {
    if (error) {
      next(error);
    } else if (!user) {
      res.render('passport/signup', {
        user: req.body,
        errors: validation
      })
    } else {
      return req.login(user, (error) => {
        if (error) {
          next(error)
        } else {
          res.redirect('passport/private')
        }
      })
    }
  })(req, res, next);
}