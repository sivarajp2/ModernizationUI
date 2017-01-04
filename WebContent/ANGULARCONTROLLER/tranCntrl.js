app.controller('tranCntrl',['$scope', '$http', '$rootScope', '$location', 'userService', 'controlService',  function($scope, $http, $rootScope, $location, userService, controlService) {
	var errmsg;
	var transactions;
	var timeStamp = Math.floor(Date.now());
	$scope.pageSize = 5;

	acct_no = localStorage.getItem('localAccountNumber');
	$scope.accountnumber = acct_no;
      	  controlService.retrievetran(acct_no,timeStamp)
      	  .then(
      		 function(data){
      			if(data.returnstatus.statusCode != true) 
	                {
	             	   $scope.errmsg = "Unable to retrieve transaction";
	             	   return;
	                }
      			  $rootScope.transactions=data.trandetails;
      		
      			 
      		
      		

      		    },
      		function(errresp){
      		    	
      			 console.log(errresp);
      			if (errresp.status === -1 && errresp.statusText === "") {
													console.log ("server error, most likely 500");
				} 
      		 }
      	  );
      
      	  $scope.return2overview=function( ){
              
              
              
          	 $location.path( "/account" );

        
     };
   
     
    
     
     
      
}])


.filter('startFrom',function(){
	  return function(data,start) {
		  if (!data || !data.length) { return; }
		   return data.slice(start);
	  }
 })
