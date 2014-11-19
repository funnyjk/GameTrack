angular.module('MatchCtl', [])
	.controller('matchController',['$scope', 'matchService', 'gameService', function($scope, matchService, gameService) {

		$scope.matches = "null";
		$scope.header = "This is the match page";
		$scope.order = "name";

		$scope.matches = matchService.query();
		$scope.games = gameService.query();

		$scope.mgame = $scope.games[0];

		$scope.addMatch = function() {
			if ($scope.mname.length > 0) {
				$scope.newMatch = new matchService();
				$scope.newMatch.name = $scope.mname;
				$scope.newMatch.gameid = $scope.mgame._id;
				matchService.save($scope.newMatch, function() {
					$scope.matches = matchService.query(6);
					$scope.mname = "";
					$scope.mgame = {};
				});
			} else {
				console.log('error');
			}
		};

		$scope.findMatch = function(mtch) {
			$scope.match = matchService.get({ id: mtch._id });
			$scope.mname = $scope.match.name;
			$scope.mgame = $scope.match._game;
		};

		$scope.updateMatch = function() {
			if ($scope.mgame.length > 0 || $scope.mgame !== null) {
				$scope.match.name = $scope.mname;
				$scope.match.gameid = $scope.mgame._id;
				matchService.update($scope.match, function() {
					$scope.mname = "";
					$scope.match._game.name = $scope.mgame.name;
					$scope.mgame = null;
					
				});
			}
		};

		$scope.deleteMatch = function(mtch) {
			$scope.i = $scope.matches.indexOf(mtch);
			$scope.matches.splice($scope.i, 1);
			matchService.delete({ id: mtch._id }, function() {});
		};
}]);