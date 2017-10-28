require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path')

// connect to the database and load models
// require('./server/models').connect("localhost:27017/WGW");
// require('./server/models').connect("mongodb://"+process.env.MONGODB_USER+":"+process.env.MONGODB_PASS+"@mongo-db1.wgworkshops.net:27017,mongo-db2.wgworkshops.net:27017/WGW?authSource=admin&replicaSet=wgw-replica");

const app = express();
// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
// tell the app to parse HTTP body messages
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));
// pass the passport middleware
app.use(passport.initialize());

// app.use('/favicon.ico', express.static('server/static/images/favicon.ico'))

// // load passport strategies
// const localSignupStrategy = require('./server/passport/local-signup');
// const localLoginStrategy = require('./server/passport/local-login');
// const localSignupStrategyAdmin = require('./server/passport/local-signup-admin');
// passport.use('local-signup', localSignupStrategy);
// passport.use('local-signup-admin', localSignupStrategyAdmin);
// passport.use('local-login', localLoginStrategy);

// // pass the authorization checker middleware
// const authCheckMiddleware = require('./server/middleware/auth-check');
// app.use('/api', authCheckMiddleware);
// const authCheckTemplateMiddleware = require('./server/middleware/auth-check-templates');
// app.use('/tmp', authCheckTemplateMiddleware);

// // routes
const apiRoutes = require('./server/routes/api');
app.use('/api', apiRoutes);
app.get('*', (req, res) => res.sendFile(path.join(__dirname+'/server/static/index.html')))



// start the server
app.listen(3000, () => {
  console.log('Server is running on 3000');
});
