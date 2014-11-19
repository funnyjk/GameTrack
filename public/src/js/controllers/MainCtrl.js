angular.module('MainCtl', ['ui.router'])
	.controller('mainController',['$scope', '$state', 'playerService', 'scoreService', 'gameService', 'matchService', function($scope, $state, playerService, scoreService, gameService, matchService) {
		$scope.header = "This is the main page";
		// $scope.players = playerService.query();
		// $scope.scores = scoreService.query();
		// $scope.games = gameService.query();
		// $scope.matches = matchService.query();
		$scope.message = "start";

		$scope.changeView = function(view, match) {
			$scope.match = match;
			$state.go(view);
		};

		$scope.findPlayer = function(player) {
			var indx = $scope.players.indexOf(player);
			$scope.player = $scope.players[indx];
		};
		$scope.findScore = function(score) {
			var indx = $scope.scores.indexOf(score);
			$scope.score = $scope.scores[indx];
			// $scope.score = scoreService.get({id: score._id});
		};
		$scope.findGame = function(game) {
			var indx = $scope.games.indexOf(game);
			$scope.game = $scope.games[indx];
			// $scope.game = gameService.get({id: game._id});
		};
		$scope.findMatch = function(match) {
			var indx = $scope.matches.indexOf(match);
			$scope.match = $scope.matches[indx];
			// $scope.match = matchService.get({id: match._id});
		};

		$scope.scoreUpdate = function(match) {
			var indx = $scope.matches.indexOf(match);
			$scope.match = $scope.matches[indx];
			for (i = 0; i < $scope.match.scores.length; i++) {
				scoreService.update($scope.match.scores[i]);
			}
		};

		$scope.addScore = function(mtc, ply) {
			$scope.newScore = new scoreService();
			$scope.newScore.matchid = mtc;
			$scope.newScore.playerid = ply;
			scoreService.save($scope.newScore, function() {
				var indx = $scope.matches.indexOf($scope.match);
				refreshMatch(indx);
			});
		};

		$scope.deleteScore = function(score) {
			var indx = $scope.match.scores.indexOf(score);
			$scope.match.scores.splice(indx,1);
			scoreService.delete({ id: score._id }, function() {});
		};

		var refreshMatch = function(indx) {
			$scope.matches = matchService.query(function() {
				$scope.match = $scope.matches[indx];
			});
		};

		var init = function() {
			$scope.players = playerService.query();
			$scope.scores = scoreService.query();
			$scope.games = gameService.query();
			$scope.matches = matchService.query();
		};

		init();
}]);