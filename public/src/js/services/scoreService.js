angular.module('ScoreSrv', ['ngResource'])
	.factory('scoreService', ['$resource', function($resource) {
		return $resource('/api/scores/:id', { id: '@_id' }, {
			update: {
				method: 'PUT' // this method issues a PUT request
			}
		});
	}]);