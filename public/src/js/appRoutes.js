angular.module('uiRout', [])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

		$locationProvider.html5Mode(true);

		$urlRouterProvider.otherwise('/matches');

		$stateProvider

			.state('main', {
				// url: '/',
				views: {
					'': {templateUrl: 'views/views/content.html'},
					'side@main': { templateUrl: 'views/views/main.html'},
					'content@main': {template: 'Main Page'}
				}
			})
			.state('main.players', {
				url: '/player',
				templateUrl: 'views/views/player.html',

			})
			.state('main.games', {
				url: '/game',
				templateUrl: 'views/views/game.html',

			})
			.state('matches', {
				views: {
					'': {templateUrl: 'views/views/content.html'},
					'side@matches': { templateUrl: 'views/views/main.html'},
					'content@matches': {templateUrl: 'views/views/matches.html',}
				}
			})
			.state('matches.list', {
				url: '/matches',
				templateUrl: 'views/views/matches.list.html',
			})
			.state('matches.match', {
				templateUrl: 'views/views/match.html',

			})
			.state('matches.match.player-new', {
				templateUrl: 'views/views/new-match-player.html',
			});
}]);
