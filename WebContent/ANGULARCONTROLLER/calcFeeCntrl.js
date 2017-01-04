app.controller('calcFeeCntrl',['$scope', '$http', '$rootScope', '$location', 'userService', 'controlService', function($scope, $http, $rootScope, $location, userService, controlService) {
	var errmsg;
	var success;
	var accountDataInfo;
	var postTransactionInfo;
	var feecharged;
	var currentbalance;
	var type;
	$scope.transactiontype = ["Debit", "Credit"];
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var validatetranamt;
    $scope.showpost=true;
	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 
	today = mm+'/'+dd+'/'+yyyy;
	$scope.transactiondate = today;
	acct_no = localStorage.getItem('localAccountNumber');
	$scope.accountnumber = acct_no;
    $scope.post=function( ){
    	acct_no = localStorage.getItem('localAccountNumber');
    	$scope.accountnumber = acct_no;
      	  
      	  controlService.loadAccount(acct_no)
      	  .then(
      		 function(data){
      			  $rootScope.accountDataInfo=data;
      			  $scope.accountnumber=data.accountNumber;
      			  currentbalance = data.currentBalance;
      			  
      			if (((data.currentBalance + $scope.transactionamount) > data.creditLimit) && ($scope.transactiontypes == "D")) {
    		    	  $scope.errmsg = "Revalidate transaction amount";
    		 
    		    	  $scope.showpost=true;
    		      }
        			else
        				{
        				$scope.errmsg = " ";

			      			
			      			 feecharged = data.feeCharged;
      		   
      		   
      		     		      
      				      
 
		      		    controlService.postTransaction($scope.accountnumber,$scope.transactionamount,$scope.transactioncode,$scope.transactiontypes,$scope.transactiondesc,$scope.transactiondate,$scope.transactiondate,feecharged,currentbalance )
		      	   	  .then(
		      	   		 function(data){
		      	   			 $rootScope.postTransactionInfo = data;                             
		      	                if(data.statusCode != true) 
		      	                {
		      	             	   $scope.errmsg = "Unable to post transaction";
		      	                }else { $scope.errmsg = "Posted Successfully"; }
		      	          	  
		      	   		 },
		      	   		function(errresp){
																			      	   			 console.log('posting- External error')
		      	   		 }
		      	   	  );
		   
      		      
        				}
      		      
      		       		 },
      		function(errresp){
      			 console.log('error in load account')
      		 }
      	  );
      
       
      	
        
  

    
          
      };

      
      
      
      
      $scope.return2overview=function( ){
          
          
          
     	 $location.path( "/account" );

   
};
      
}]);