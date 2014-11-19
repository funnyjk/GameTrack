angular.module('GameSrv', ['ngResource'])
	.factory('gameService', ['$resource', function($resource) {
		return $resource('/api/games/:id', { id: '@_id' }, {
			update: {
				method: 'PUT' // this method issues a PUT request
			}
		});
	}]);