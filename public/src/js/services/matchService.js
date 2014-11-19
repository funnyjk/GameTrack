angular.module('MatchSrv', ['ngResource'])
	.factory('matchService', ['$resource', function($resource) {
		return $resource('/api/matches/:id', { id: '@_id' }, {
			update: {
				method: 'PUT' // this method issues a PUT request
			}
		});
	}]);