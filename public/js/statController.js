angular.module("StatisticApp").controller("statController", function($scope) {
   
  $scope.getStatistics = function() {
  
    $.ajax({
      url: "/calendarEvent",
      method: "GET",
      data: { 
        calendarId: "levon.hakopyan@gmail.com",
        tokens: {
          access_token: "ya29.UgCB0vuaDAkdcyAAAACGhieXmQYIdanoqPdSLdhqyR9qbtHxTE2SWLtgBZmmzQ",
          token_type: "Bearer",
          expires_in: 3599
        },      
        startDate: $scope.start + "T00:00:00.000Z",
        endDate: $scope.end + "T23:59:59.000Z"
      },
       
      success: function(data) {
        $scope.statistics = JSON.parse(data);
        console.log(data);  
        createCharts($scope.statistics.tasks);
        $scope.$apply();    
      }
      
    });
    
  };
  
  var createCharts = function(tasks) {
  	var elem = $('#graph');
    var child = $(elem).children();
    
    if(child.length) {
		  elem.empty();
    }
    
  	barChart(tasks);
  	pieChart(tasks);
  };
  
	var barChart = function(tasks) {
    var div = d3.select("#graph")
    		.append("div")
    		.attr("id", "barChart");
    
    var bars = d3.select("#barChart")                  
			.selectAll("div.bar")
			.data(tasks)
			.enter().append("div")
			.attr("class","bar")
			.style("width",function(d) {return d.quantity * 10 + "px" })
			.style("outline","0.5px solid grey") 
			.text(function(d) { return d.quantity; });
		
		// Add description text under chart 
		var description = d3.select("#barChart")
			.append("p")
			.style("text-anchor", "middle")
			.text("Quantity of TASKS in the selected time interval");
	};
  
  var pieChart = function(tasks) {
    var data = tasks;
  	var r = 150;
    var color = d3.scale.category20c();
		
		var div = d3.select("#graph")
  		.append("div")
  		.attr("id", "pieChart");
  
    var canvas = d3.select("#pieChart")
      .append("svg")
      .attr("width", 300)
      .attr("height", 300);
        
    var group = canvas.append("g")
  		.attr("transform", "translate(150, 150)");
    		
    var arc = d3.svg.arc()
  		.innerRadius(50)
  		.outerRadius(r);
    		
    var pie = d3.layout.pie()
  		.value(function(d) { return d.totalPercent; });
    		
    var arcs = group.selectAll(".arc")
  		.data(pie(data))
  		.enter()
  		.append("g")
  		.attr("class", "arc");
    		
    arcs.append("path")
  		.attr("d", arc)
  		.attr("fill", function(d) { return color(Math.random())});
         
    arcs.append("text")
  		.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")" })
			.style("text-anchor", "middle")
			.style("font-size", "1em")
  		.text(function(d) {return d.value + "%"});
   
    // Add description text under chart 
    var description = d3.select("#pieChart")
  		.append("p")
  		.style("text-anchor", "middle")
  		.text("Percentage of time spent for each TASK in the selected time interval");
  };  

});
