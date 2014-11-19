var fs = require('fs');
var models= require('../models/models');
var async = require('async');

module.exports = function(api) {

	// game routes
	api.route('/games')
		.post(function(req, res) {
			var game = new models.Game();
			game.name = req.body.name;

			// Save game
			game.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Game created!' });
			});
		})
		.get(function(req, res) {
			models.Game
				.find()
				.exec(function(err1, games) {
					if (err1)
						res.send(err1);
					async.eachSeries(games, function(game, callback1) {
						models.Match
							.find({ _game: game._id })
							.exec(function(err2, matches) {
								if (err2)
									res.send(err2);
								async.eachSeries(matches, function(match, callback2) {
									models.Score
										.find({ _match: match._id})
										.populate('_player')
										.exec(function(err3, scores) {
											if (err3) 
												res.send(err3);
											match.scores = scores;
											callback2();
										});
								}, function(err) {
									if (err)
										res.send(err);
									game.matches = matches;
									callback1();
								});
							});
					}, function(err) {
						if (err)
							res.send(err);
						res.json(games);
					});
				});
		});

	api.route('/games/:game_id')
		.get(function(req, res) {
			models.Game
				.find({ _id: req.param('game_id') })
				.exec(function(err1, games) {
					if (err1)
						res.send(err1);
					async.eachSeries(games, function(game, callback1) {
						models.Match
							.find({ _game: req.param('game_id') })
							.exec(function(err2, matches) {
								if (err2)
									res.send(err2);
								async.eachSeries(matches, function(match, callback2) {
									models.Score
										.find({ _match: match._id})
										.populate('_player')
										.exec(function(err3, scores) {
											if (err3) 
												res.send(err3);
										match.scores = scores;
										callback2();
										});
								}, function(err) {
									if (err)
										res.send(err);
									game.matches = matches;
								callback1();
								});
							});
					}, function(err) {
						if (err)
							res.send(err);
						res.json(games);
					});
				});
		})
		.put(function(req, res) {
			models.Game.findById(req.params.game_id, function(err, game) {
				if (err)
					res.send(err);
				
				// update info
				game.name = req.body.name;

				// save info
				game.save(function(err) {
					if (err)
						res.send(err);
					res.json({ message: 'Game updated' });
				});
			});
		})
		.delete(function(req, res) {
			models.Game.remove({
				_id: req.params.game_id
			}, function(err, game) {
				if (err)
					res.send(err);
				res.json({ message: 'Successfully deleted' });
			});
		});
};

function GameMatchScorePlay (game, callback) {
		models.Match
			.find({ _game: game._id })
			.populate('_game')
			.exec(function(err, matches) {
				if (err)
					res.send(err);
				async.each(matches, function(match, callback) {
					models.Score
						.find({ _match: match._id})
						.populate('_player')
						.exec(function(err, score) {
							if (err) { res.send(err) };
							if (!score.length) {
								console.log('no scores');
								callback();
							} else {
								match.scores = score;
								console.log('scores');
								callback();
							};
						});
				}, function(err) {
					if (err)
						res.send(err);
					res.json(games);
				});
			});
};