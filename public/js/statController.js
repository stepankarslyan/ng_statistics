angular.module("StatisticApp").controller("statController", function($scope) {
   
  $scope.getStatistics = function() {
  
    $.ajax({
      url: "/calendarEvent",
      method: "GET",
      data: { 
        calendarId: "geqtfulmg33djpa049401p07oo@group.calendar.google.com",
        tokens: {
          access_token: "ya29.TQAxQpTcFEMHR0kAAACT02_ZtboFQ8hTrPNaG0sa19--vJLlE6j-9JppIs-ouwCG0XHPMtY8sXNwYQkiGG2shwbAnYDaomF0-hWzVYvKDxE9bHTlVjc0spd4olVp-g",
          token_type: "Bearer",
          expires_in: 3599
        },
             
        startDate: $scope.start + "T00:00:00.000Z",
        endDate: $scope.end + "T00:00:00.000Z"
      },
                

      success: function(data) {
        $scope.statistics = JSON.parse(data);
        console.log(data);  
        buildChart($scope.statistics.tasks);
        $scope.$apply();    
      }
      

    });
    
  };
  
  //chart function
  
  var buildChart = function(tasks) {
    var bars = d3.select("#chart")                  
            .selectAll("div.bar")
            .data(tasks)
            .enter().append("div")
            .attr("class","bar")
              .style("width",function(d) {return d.quantity * 10 + "px" })
              .style("outline","0.5px solid grey") 
              .text(function(d) { return d.quantity; });
              
   
  };
  
});
