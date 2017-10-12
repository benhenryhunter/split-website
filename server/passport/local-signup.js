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
    type:"host",
    lname: req.body.lname.trim()
  };

  const requestData = {
    "FName":req.body.fname.trim(),
    "LName":req.body.lname.trim(),
    "Email":req.body.email.trim(),
    "BDFMO":req.body.bdfmo.trim(),
    "Company": req.body.company.trim(),
    "Phone": req.body.phone.trim(),
    "SignedGeneralAgreement": false,
    "SignedSSAmendment": false,
    "SignedTAXAmendment": false,
    "SignedRAmendment": false,
    "SignedRPAmendment": false
  };

  request({
    url: apiHost+"/Host",
    method: "POST",
    headers: {
        "content-type": "application/json",
    },
    json: requestData
  }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
          userData["mongoId"] = body.HostID
          const newUser = new User(userData);
            newUser.save((err) => {
              if (err) { return done(err); }

              return done(null);
            });
      } else {
          console.log(requestData)
          console.log("error: " + error)
          console.log("response.statusCode: " + response.statusCode)
          console.log("response.statusText: " + response.statusText)
      }
  })

});