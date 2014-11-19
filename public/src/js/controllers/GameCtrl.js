angular.module('GameCtl', [])
	.controller('gameController',['$scope', 'gameService', 'matchService', function($scope, gameService, matchService) {

		$scope.games = "null";
		$scope.header = "This is the game page";
		$scope.order = "name";

		$scope.games = gameService.query();

		$scope.addGame = function() {
			if ($scope.gname.length > 0) {
				$scope.newGame = new gameService();
				$scope.newGame.name = $scope.gname;
				gameService.save($scope.newGame, function() {
					$scope.games = gameService.query();
					$scope.gname = "";
				});
			} else {
				console.log('error');
			}
		};

		$scope.findGame = function(gme) {
			$scope.i = $scope.games.indexOf(gme);
			$scope.game = $scope.games[$scope.i];
			$scope.gname = $scope.game.name;
			$scope.selectGame = gameService.query({ id: gme._id });
		};

		$scope.updateGame = function() {
			if ($scope.gname.length > 0 || $scope.gname !== null) {
				$scope.game.name = $scope.gname;
				gameService.update($scope.game, function() {
					$scope.gname = "";
				});
			}
		};

		$scope.deleteGame = function(gme) {
			$scope.ind = $scope.games.indexOf(gme);
			$scope.games.splice($scope.ind, 1);
			gameService.delete({ id: gme._id }, function() {});
		};
}]);