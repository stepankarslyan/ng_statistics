angular.module('StatisticApp', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
// var path = templatePath;
//  if (!path) path = '';
	$routeProvider.
		when('/show', {templateUrl: 'template/statistic.html', controller: 'statController'}).
		otherwise({redirectTo: '/show'});
}]);
