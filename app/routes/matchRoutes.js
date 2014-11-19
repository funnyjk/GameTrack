var fs = require('fs');
var models= require('../models/models');
var async = require('async');

module.exports = function(api) {

	// match routes
	api.route('/matches')
		.post(function(req, res) {
			var match = new models.Match();
			match.name = req.body.name;
			match._game = req.body.gameid;

			// Save match
			match.save(function(err, match) {
				if (err)
					res.send(err);
				res.json({ message: 'Match created!' });
			});
		})
		.get(function(req, res) {
			models.Match
				.find()
				.populate('_game')
				.exec(function(err, matches) {
					if (err)
						res.send(err);
						async.each(matches,function(match, callback) {
							models.Score
								.find({ _match: match._id})
								.populate('_player')
								.exec(function(err, score) {
									if (err) { res.send(err) };
									match.scores = score;
									callback();
								});

						}, function(err) {
							if(err)
								console.log("async err" +err);
							res.json(matches);					
						});	
				});			
		});

	api.route('/matches/:match_id')
		.get(function(req, res) {
			models.Match
				.findById(req.param('match_id'))
				.populate('_game')		
				.exec(function(err, match) {
					if (err)
						res.send(err);
					models.Score
						.find({ _match: match._id})
						.populate('_player')
						.exec(function(err, score) {
							if (err) { res.send(err) };
							match.scores = score;
							res.json(match);
						});
				});
		})
		.put(function(req, res) {
			models.Match.findById(req.params.match_id, function(err, match) {
				if (err)
					res.send(err);
				
				// update info
				match.name = req.body.name;
				match._game = req.body.gameid;

				// save info
				match.save(function(err) {
					if (err)
						res.send(err);
					res.json({ message: 'Match updated' });
				});
			});
		})
		.delete(function(req, res) {
			models.Match.remove({
				_id: req.params.match_id
			}, function(err, match) {
				if (err)
					res.send(err);
				res.json({ message: 'Successfully deleted' });
			});
		});
};