var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var gameSchema = mongoose.Schema({
	name: String,
	matches: []
});

module.exports = mongoose.model('Game', gameSchema);