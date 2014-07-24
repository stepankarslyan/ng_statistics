angular.module('StatisticApp', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
  var path = templatePath;
//  if (!path) path = '';
	$routeProvider.

		when('/show', {templateUrl: path + '/template/statistic.html', controller: 'statController'}).
		when('/chart', {templateUrl: path + '/template/barChart.html', controller: 'statController'}).
		otherwise({redirectTo: '/show'});
}]);
