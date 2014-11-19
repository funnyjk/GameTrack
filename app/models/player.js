var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
	name: String,
	scores: []
});

module.exports = mongoose.model('Player', playerSchema);