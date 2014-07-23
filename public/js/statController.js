angular.module("StatisticApp").controller("statController", function($scope) {
   
  $.ajax({
    url: "/statistics",
    method: "GET",
    
    success: function(data) {
//      $scope.statistics = JSON.parse(data);
        buildChart(data);  
        console.log(data);
           
      $scope.$apply();    
    }
  
  });
  
});
