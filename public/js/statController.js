angular.module("StatisticApp").controller("statController", function($scope) {
   
  $scope.getStatistics = function() {
  
    $.ajax({
      url: "/calendarEvent",
      method: "GET",
      data: { calendarId: "geqtfulmg33djpa049401p07oo@group.calendar.google.com",
              tokens: {access_token:"ya29.TADESwIF_diGCEkAAACfT4IrZnFEU1w85154N5xphVz1APSPAizLKMo7OUbsNDYTLYJieRw9BzrNRxjJPE79Y0MbWEQ4q0DC5FPliboHfQg9ZWHpvhrHQdz73kGedQ",
                      token_type:"Bearer",  
                      expires_in :3599
             
              },
              startDate: $scope.start + "T07:19:47.000Z",
	            endDate: $scope.end + "T00:00:00.000Z"
                
      },

      success: function(data) {
          
        console.log(data);  
        $scope.$apply();    
      },
      

    });
    
  };
});
