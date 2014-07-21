angular.module('StatisticApp').controller("statController", function($scope) {

  $.ajax({
    url: "/statistics",
    method: "GET",
    data: {
    	start: $scope.start + "T00:00:00.000Z",
    	end: $scope.end + "T00:00:00.000Z"
    },
    
    success: function(data) {
      $scope.statistics = JSON.parse(data);
        
        console.log(data);
      
      
      $scope.$apply();    
    }
  	
  });
	
});
