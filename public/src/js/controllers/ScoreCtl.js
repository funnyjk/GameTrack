angular.module('ScoreCtl', [])
	.controller('scoreController',['$scope', 'scoreService', 'matchService', 'playerService', function($scope, scoreService, matchService, playerService) {

		$scope.scores = "null";
		$scope.header = "This is the score page";
		$scope.order = "_.player.name";

		$scope.scores = scoreService.query();
		$scope.matches = matchService.query();
		$scope.players = playerService.query();

		$scope.addScore = function() {
			$scope.newScore = new scoreService();
			$scope.newScore.matchid = $scope.smatch._id;
			$scope.newScore.playerid = $scope.splayer._id;
			scoreService.save($scope.newScore, function() {
				$scope.scores = scoreService.query();
			});
		};

		$scope.findScore = function(scre) {
			$scope.i = $scope.scores.indexOf(scre);
			$scope.score = $scope.scores[$scope.i];
			$scope.smatch = $scope.score._match;
			$scope.splayer = $scope.score._player;
		};

		$scope.updateScore = function() {
				$scope.score.matchid = $scope.smatch._id;
				$scope.score.playerid = $scope.splayer._id;
				scoreService.update($scope.score, function() {
					$scope.scores = scoreService.query();
				});
		};

		$scope.deleteScore = function(scre) {
			$scope.i = $scope.scores.indexOf(scre);
			$scope.scores.splice($scope.i, 1);
			scoreService.delete({ id: scre._id }, function() {});
		};
}]);