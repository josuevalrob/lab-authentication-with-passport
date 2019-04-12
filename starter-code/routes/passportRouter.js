const express        = require("express");
const passportRouter = express.Router();
const accessController = require('../controller/access.controller')
// 

// Add bcrypt to encrypt passwords

// Add passport 


const ensureLogin = require("connect-ensure-login");


passportRouter.get('/signup', accessController.signup)
passportRouter.post('/signup', accessController.doSignup)

passportRouter.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", { user: req.user });
});

module.exports = passportRouter;