const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: String,
  password: String
}, {
  timestamps: true
});

// password encrypting
userSchema.pre('save', function(next) {
  const user = this;  
  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR) //return the salt in a promise. 
      .then(salt => {
        return bcrypt.hash(user.password, salt) //return the hash in a promise
          .then(hash => {
            user.password = hash;
            next();
          });
      })
      .catch(error => next(error));
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password); //return true or false. 
}
const User = mongoose.model("User", userSchema);
module.exports = User;