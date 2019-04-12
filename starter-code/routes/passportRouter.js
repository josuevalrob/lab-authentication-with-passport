const express        = require("express");
const passportRouter = express.Router();
const accessController = require('../controller/access.controller')
// 

// Add bcrypt to encrypt passwords

// Add passport 


const ensureLogin = require("connect-ensure-login");

// Register
passportRouter.get('/signup', accessController.signup)
passportRouter.post('/signup', accessController.doSignup)
// Login
passportRouter.get('/login', accessController.login)
passportRouter.post('/login', accessController.doLogin)
// Private

passportRouter.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", { user: req.user });
});

module.exports = passportRouter;