// modules ====================================
var express  = require('express');
var fs = require('fs');
var app      = express();
var port     = process.env.PORT || 80;
var mongoose = require('mongoose');
var flash 	 = require('connect-flash');
var async = require('async');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var api = express.Router();

var configDB = require('./app/config/database.js');

// configuration ==============================
mongoose.connect(configDB.url);

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/public/views');
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.use(flash()); // use connect-flash for flash messages stored in session

// models ======================================
// require('./app/models/models');
// routes  ======================================
require('./app/routes/routes')(app, api); // General routes
require('./app/routes/playerRoutes')(api); //Player routes
require('./app/routes/gameRoutes')(api);
require('./app/routes/matchRoutes')(api);
require('./app/routes/scoreRoutes')(api);
app.use('/api', api);

app.get('*', function(req, res){
	res.render('index');
});

// start app ==================================
app.listen(port);
console.log('Listening on Port: ' + port);