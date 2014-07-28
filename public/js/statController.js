angular.module("StatisticApp").controller("statController", function($scope) {
   
  $scope.getStatistics = function() {
  
    $.ajax({
      url: "/calendarEvent",
      method: "GET",
      data: { 
        calendarId: "geqtfulmg33djpa049401p07oo@group.calendar.google.com",
        tokens: {
          access_token: "ya29.UABIJ2V5nT7u5kkAAAAR_9nkXGS4nSYnZkU0l59OuwaDuiBRHa2GlPAdIYBTVQoqfeKOI6A51jouR1P0fwBg06SWGDY7x_1IY5euLGIrGWv9iyxDR6fz2aJnD9b25g",
          token_type: "Bearer",
          expires_in: 3599
        },
             
        startDate: $scope.start + "T00:00:00.000Z",
        endDate: $scope.end + "T00:00:00.000Z"
      },
                

      success: function(data) {
        $scope.statistics = JSON.parse(data);
        console.log(typeof($scope.statistics));
        console.log($scope.statistics.tasks);  
        buildChart($scope.statistics.tasks);
       // buildPieChart($scope.statistics.tasks)
        $scope.$apply();    
      }
      

    });
    
  };

  //chart function
  
  var buildChart = function(task) {
    var div = d3.select("#chart");
    
    var bar = div.selectAll("div.bar")
                  .data(task)
                  .enter()
                  .append("div")
                  .attr("class", "bar")
                  .style("background-color", function(d) {return d3.rgb(15, 240, + d.quantity * 3);})
                  .style("height", function(d) {return d.quantity * 40 + "px"; })
                  .text(function(d) {return d["name"];});
                         
  };          
  
  //pie chart
  //var buildPieChart = function(tasks) {
  
    var data = [10, 20, 50];
    var r = 200;

    var color = d3.scale.ordinal()
      .range(["red", "blue", "green"]);

    var canvas = d3.select("#chart")
      .append("svg")
      .attr("width", "1500")
      .attr("height", "1500");
      
    var group = canvas.append("g")
      .attr("transform", "translate(300, 200)");
      
    var arc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(r);
      
    var pie = d3.layout.pie()
      .value(function(d) {return d.data; });
      
    var arcs = group.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "pie");
      
    arcs.append("path")
      .attr("d", arc)
      .attr("fill", function(d) { return color(d.data); });
      
    arcs.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("text-anchor", "middle")
      .attr("font-size", "1.5em")
      .text(function(d) { return d.data; });
    
  
 // };
  
});
