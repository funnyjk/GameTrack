angular.module('PlyrCtl', [])
	.controller('playerController',['$scope', 'playerService', 'matchService', function($scope, playerService, matchService) {

		$scope.players = "null";
		$scope.header = "This is the player page";
		$scope.order = "name";

		$scope.players = playerService.query();

		$scope.addPlayer = function() {
			if ($scope.pname.length > 0) {
				$scope.newPlayer = new playerService();
				$scope.newPlayer.name = $scope.pname;
				playerService.save($scope.newPlayer, function() {
					$scope.players = playerService.query();
					$scope.pname = "";
				});
			}
		};

		$scope.findPlayer = function(plyr) {
			$scope.i = $scope.players.indexOf(plyr);
			$scope.player = $scope.players[$scope.i];
			$scope.pname = $scope.player.name;
		};

		$scope.updatePlayer = function() {
			if ($scope.pname.length > 0 || $scope.pname !== null) {
				$scope.player.name = $scope.pname;
				playerService.update($scope.player, function() {
					$scope.pname = "";
				});
			}
		};

		$scope.deletePlayer = function(plyr) {
			$scope.ind = $scope.players.indexOf(plyr);
			$scope.players.splice($scope.ind, 1);
			playerService.delete({ id: plyr._id }, function() {});
		};
}]);