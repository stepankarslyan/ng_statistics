angular.module("StatisticApp").controller("statController", function($scope) {
   
  $scope.getStatistics = function() {
  
    $.ajax({
      url: "/calendarEvent",
      method: "GET",
      data: { 
        calendarId: "something.calendar.google.com",
        tokens: {
          access_token: "Your access_token",
          token_type: "Bearer",
          expires_in: 3599
        },
             
        startDate: $scope.start + "T00:00:00.000Z",
        endDate: $scope.end + "T00:00:00.000Z"
      },
                

      success: function(data) {
        $scope.statistics = JSON.parse(data);
        console.log(typeof($scope.statistics.tasks));
        console.log($scope.statistics.tasks);  
        var tasks = $scope.statistics.tasks;
        buildBarChart($scope.statistics.tasks);
        buildPieChart(tasks);
        
        $scope.$apply();    
      }
      

    });
    
  };

//bar chart
  
  var buildBarChart = function(task) {
    var div = d3.select("#chart");
    
    var bar = div.selectAll("div.bar")
                  .data(task)
                  .enter()
                  .append("div")
                  .attr("class", "bar")
                  .style("background-color", function(d) {return d3.rgb(15, 240, + d.quantity * 3);})
                  .style("height", function(d) {return d.quantity * 40 + "px"; })
                  .text(function(d) {return d.name;});
                         
  };          
  
//pie chart
  var buildPieChart = function(tasks) {
    
    var data = tasks;
    var r = 200;

    var color = d3.scale.ordinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var canvas = d3.select("#chart")
      .append("svg")
      .attr("width", "500")
      .attr("height", "500");
      
    var group = canvas.append("g")
      .attr("transform", "translate(300, 200)");
      
    var arc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(r);
      
    var pie = d3.layout.pie()
      .value(function(d) {return d.quantity; });
      
    var arcs = group.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "pie");
      
    arcs.append("path")
      .attr("d", arc)
      .attr("fill", function(d) { return color(d.data.name); });
      
    arcs.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("text-anchor", "middle")
      .attr("font-size", "1em")
      .text(function(d) { return d.data.name; });
      
  };
  
});
