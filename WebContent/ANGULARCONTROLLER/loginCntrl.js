app.controller('loginCntrl',function($scope,$location){
	var errmsg;
	var success;
      
      $scope.login=function( ){
            
             
             if ($scope.username != "admin" || $scope.password != "pass"){
            	 $scope.errmsg = "Check Userid and Password: Retry";
            	 $scope.success ="";
            		console.log($scope.errmsg);
             }

             else 
            	 {
            	 $scope.errmsg ="";
            	 console.log($scope.success);
            	 $location.path( "/accountquery" );
            	 }         
          
      };
      
});
