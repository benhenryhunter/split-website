const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const request = require("request");

var apiHost = ""
if (process.env.NODE_ENV == "production") {
  apiHost = "http://api-elb.wgworkshops.net:8080"
} else {
  apiHost = "http://localhost:8080"
}

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    fname: req.body.fname.trim(),
    type: req.body.type,
    lname: req.body.lname.trim()
  };

  const newUser = new User(userData);
  newUser.save((err) => {
    if (err) { return done(err); }

    return done(null);
  });

});