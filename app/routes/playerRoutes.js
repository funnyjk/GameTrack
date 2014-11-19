var fs = require('fs');
var models= require('../models/models');
var async = require('async');

module.exports = function(api) {

	// player routes
	api.route('/players')
		.post(function(req, res) {
			var player = new models.Player();
			player.name = req.body.name;

			// Save player
			player.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Player created!' });
			});
		})
		.get(function(req, res) {
			models.Player.find(function(err, players) {
				if (err)
					res.send(err)
				async.eachSeries(players, function(player, callback) {
					models.Score
						.find({_player: player._id})
						.populate('_match')
						.exec(function(err, scores) {
							player.scores = scores;
							callback();
						});
				}, function(err) {
					if (err)
						res.send(err);
					res.json(players);
				});
			});
		});

	api.route('/players/:player_id')
		.get(function(req, res) {
			models.Player.findById(req.params.player_id, function(err, player) {
				if (err)
					res.send(err);
					models.Score
						.find({_player: req.param('player_id')})
						.populate('_match')
						.exec(function(err, scores) {
							player.scores = scores
							res.json(player);
						});
			});
		})
		.put(function(req, res) {
			models.Player.findById(req.params.player_id, function(err, player) {
				if (err)
					res.send(err);
				
				// update info
				player.name = req.body.name;

				// save info
				player.save(function(err) {
					if (err)
						res.send(err);
					res.json({ message: 'Player updated' });
				});
			});
		})
		.delete(function(req, res) {
			models.Player.remove({
				_id: req.params.player_id
			}, function(err, player) {
				if (err)
					res.send(err);
				res.json({ message: 'Successfully deleted' });
			});
		});
};