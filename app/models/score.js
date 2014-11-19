var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var matchSchema = mongoose.Schema({
	_match: { type: ObjectId, ref: 'Match' },
	_player: { type: ObjectId, ref: 'Player' },
	wins: Number,
	loses: Number,
	ties: Number,
	score: Number
});

module.exports = mongoose.model('Score', matchSchema);