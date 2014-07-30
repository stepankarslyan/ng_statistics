angular.module('StatisticApp', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
  var path = templatePath;
	
	$routeProvider.
		when('/chart', {templateUrl: path + '/template/statistic.html', controller: 'statController'}).
		otherwise({redirectTo: '/chart'});
}]);
