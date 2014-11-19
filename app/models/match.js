var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var matchSchema = mongoose.Schema({
	name: String,
	_game: { type: ObjectId, ref: 'Game' },
	scores: []
});

module.exports = mongoose.model('Match', matchSchema);