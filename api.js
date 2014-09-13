var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var session = require('express-session');
var app = express();
var routes = require('./routes');

// set view directory
app.set('views', __dirname + '/views');

// set view engine
app.set('view engine', 'jade');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// JSON spaces
app.set('json spaces', 2);

// serve static file
app.use(serveStatic('public/', {'index': false}));

// session
app.use(session({
  secret: process.env.APINIC_MOVIES_SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

// flash
app.use(require('flash')());

// routes
routes.setup(app);

app.listen(process.env.PORT || 5000);
