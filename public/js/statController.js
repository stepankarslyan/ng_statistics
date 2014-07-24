angular.module("StatisticApp", ["ngRoute"]).controller("statController", function($scope) {
   
  $.ajax({
    url: "/calendarEvent",
    method: "GET",
    data: {
      calendarId: "geqtfulmg33djpa049401p07oo@group.calendar.google.com",
      tokens: 
    },
    
    success: function(data) {
//      $scope.statistics = JSON.parse(data);
        buildChart(data);  
        console.log(data);
           
      $scope.$apply();    
    }
  
  });
  
});
