var fs = require('fs');
var models= require('../models/models');
var async = require('async');

module.exports = function(api) {

	// score routes
	api.route('/scores')
		.post(function(req, res) {
			var score = new models.Score();
			score._match = req.param('matchid');
			score._player = req.param('playerid');
			score.wins = 0;
			score.loses = 0;
			score.ties = 0;
			score.score = 0;

			// Save score
			score.save(function(err, score) {
				if (err)
					res.send(err);
				res.json({ message: 'Score created!' });
			});
		})
		.get(function(req, res) {
			models.Score
				.find()
				.populate('_match _player')
				.exec(function(err, scores) {
					async.eachSeries(scores, function(score, callback) {
						models.Match
						.populate(score._match, {path:'_game'}, function(err, game) {
							if(err) throw err;
							callback();
						});
					}, function(err) {
						if(err) throw err;
						res.json(scores);
					});
					if(err) throw err;
				});
		});

	api.route('/scores/:score_id')
		.get(function(req, res) {
			models.Score
				.findById(req.params.score_id)
				.populate('_match _player')
				.exec(function(err, score) {
					if(err) throw err;
					models.Match
						.populate(score._match, {path:'_game'}, function(err, game) {
							if(err) throw err;
							res.json(score);
						});

				});
		})
		.put(function(req, res) {
			models.Score.findById(req.params.score_id, function(err, score) {
				if (err)
					res.send(err);
				
				// update info
				// score._match = req.body._match;
				// score._player = req.body._player;
				score.wins = req.body.wins;
				score.loses = req.body.loses;
				score.ties = req.body.ties;
				score.score = req.body.score;

				// save info
				score.save(function(err) {
					if (err)
						res.send(err);
					res.json({ message: 'Score updated' });
				});
			});
		})
		.delete(function(req, res) {
			models.Score.remove({
				_id: req.params.score_id
			}, function(err, score) {
				if (err)
					res.send(err);
				res.json({ message: 'Successfully deleted' });
			});
		});
};