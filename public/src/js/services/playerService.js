angular.module('PlayerSrv', ['ngResource'])
	.factory('playerService', ['$resource', function($resource) {
		return $resource('/api/players/:id', { id: '@_id' }, {
			update: {
				method: 'PUT' // this method issues a PUT request
			}
		});
	}]);