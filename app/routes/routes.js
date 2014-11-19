var fs = require('fs');

module.exports = function(app, api) {

	// app.all('/*', function(req, res, next) {
	// 	res.render('index');
	// });

	// routes
	app.get('/', function(req, res) {
		res.render('index');
	});

	api.use(function(req, res, next) {
		next(); // make sure we go to the next routes and don't stop here
	});

	api.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });	
	});
};