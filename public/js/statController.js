angular.module("StatisticApp").controller("statController", function($scope) {

  $.ajax({
    url: "/statistics",
    method: "GET",
    
    success: function(data) {
      $scope.statistics = JSON.parse(data);
        var array = [1,2,3,5];
        d3.select("#chart").selectAll("div")
        .data(array)
        .enter()
        .append("div")
        .style("color", "red")
        .text(function(d) {return d;});
  
        console.log(data);
      
      
      $scope.$apply();    
    }
  
  });

});
