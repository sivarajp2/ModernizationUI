app.controller('accountCntrl', ['$scope', '$http', '$rootScope', '$location', 'userService', 'controlService', function($scope, $http, $rootScope, $location, userService, controlService) {
		
	var mindue;
	var currentBalance;
	var errmsg;
	var controlDataInfo;
	var controlReturnInfo;
	var accountDataInfonew;
	var interestReturnInfo;
	var intApr;
	var intCharged;
	var showmindue;
	var intcharge;
	var jsobj = this;
	var acct_no;
	 var recordsInfo;
	jsobj.details= {
            accountNumber: ''
           
};

      if ( $rootScope.accountDataInfo == undefined){
    	  
    	  acct_no = localStorage.getItem('localAccountNumber');
    	  
    	  controlService.loadAccount(acct_no)
    	  .then(
    		 function(data){
    			  $rootScope.accountDataInfo=data;
    			  $scope.accountNumber=data.accountNumber;
    			  $scope.custName = data.custName;	 
    		      $scope.addressLine1 = data.addressLine1;
    		      $scope.addressLine2 = data.addressLine2;
    		      $scope.city = data.city;
    		      $scope.state = data.state;
    		      $scope.creditLimit = data.creditLimit;
    		      $scope.currentBalance = data.currentBalance;
    		      $scope.openToBuy = data.openToBuy;
       		      $scope.minimumDue = data.minimumDue;
    		      $scope.pricingId = data.pricingId;
    		      $scope.feeCharged = data.feeCharged;
    		      $scope.intCharged = data.intCharged;
    		      $scope.statusCode = data.serviceStatus.statusCode;
    		      $scope.errorCode = data.serviceStatus.errorCode;
    		      $scope.errorDesc = data.serviceStatus.errorDesc;
           	     $scope.showmindue = false;
                 $scope.intcharge = false;
    		 },
    		function(errresp){
    			 console.log('error in load account')
    		 }
    	  );
    	  
      }  
  
      if ( $rootScope.accountDataInfo != undefined){
     recordsInfo = $rootScope.accountDataInfo;
      
      $scope.accountNumber = recordsInfo.accountNumber;
      $scope.custName = recordsInfo.custName;
 
     $scope.addressLine1 = recordsInfo.addressLine1;
      $scope.addressLine2 = recordsInfo.addressLine2;
      $scope.city = recordsInfo.city;
 
      $scope.state = recordsInfo.state;
      $scope.creditLimit = recordsInfo.creditLimit;
      $scope.currentBalance = recordsInfo.currentBalance;
      $scope.openToBuy = recordsInfo.openToBuy;
 
      $scope.minimumDue = recordsInfo.minimumDue;
      $scope.pricingId = recordsInfo.pricingId;
      $scope.feeCharged = recordsInfo.feeCharged;
      $scope.intCharged = recordsInfo.intCharged;
      $scope.statusCode = recordsInfo.serviceStatus.statusCode;
      $scope.errorCode = recordsInfo.serviceStatus.errorCode;
      $scope.errorDesc = recordsInfo.serviceStatus.errorDesc;
      $scope.showmindue = false;
      $scope.intcharge = false;
    }
      
  $scope.applyMinPay = function(){

	 
	  
		  jsobj.details.accountNumber=$scope.accountNumber;
          controlService.retrieveControl(jsobj.details)
          .then(
                          function(response) {
                        	  $rootScope.controlDataInfo = response;                             
                              if(response.returnstatus.statusCode != true) 
                              {
                           	   $scope.errmsg = "control record Not Found: Retry";
                              }
                                  else {
                     console.log($rootScope.controlDataInfo);
                     mindue = $rootScope.controlDataInfo.minimumDuePercent;
                     
                     currentBalance = $rootScope.accountDataInfo.currentBalance;
                
                     console.log(mindue);
                     console.log(currentBalance);
                     
                     
                     
                	  controlService.updateMinDue($scope.accountNumber,mindue,currentBalance )
                	  .then(
                		 function(response){
                			 $rootScope.controlReturnInfo = response;                             
                             if(response.statusCode != true) 
                             {
                          	   $scope.errmsg = "Unable to Calcualte Minimum Payment";
                             }
                       	     $scope.showmindue = false;
                		 },
                		function(errresp){
                			 console.log('error in load account')
                		 }
                	  );
                     
                     
                   if (response.statusCode = true)  {
                	   
                	   userService.getAccountData($scope.accountNumber, function (response) {
                       	$rootScope.accountDataInfonew = response.data;
                       	$scope.showmindue = true;
                        $scope.intcharge = false;

                       	$scope.minimumDue = $rootScope.accountDataInfonew.minimumDue;
                   });
                	   
                	   
                   } 
                     
                     
                     
                   
                     
	  
                     }
                  });
  }; 
//start of accrue interest logic.
  $scope.accrueInterest = function(){

		 
	  
	  jsobj.details.accountNumber=$scope.accountNumber;
      controlService.retrieveControl(jsobj.details)
      .then(
                      function(response) {
                    	  $rootScope.controlDataInfo = response;                             
                          if(response.returnstatus.statusCode != true) 
                          {
                       	   $scope.errmsg = "control record Not Found: Retry";
                          }
                              else {
                 console.log($rootScope.controlDataInfo);
                 intApr = $rootScope.controlDataInfo.intToBeCharged;
                 
                 currentBalance = $rootScope.accountDataInfo.currentBalance;
                 intCharged = $rootScope.accountDataInfo.intCharged;
            
    
                 
                 
            	  controlService.accrueInterest($scope.accountNumber,intApr,currentBalance,intCharged )
            	  .then(
            		 function(response){
            			 $rootScope.interestReturnInfo = response;                             
                         if(response.statusCode != true) 
                         {
                      	   $scope.errmsg = "Unable to accrue Interest";
                         }
                   	     $scope.intcharge = false;
            		 },
            		function(errresp){
            			 console.log('error in load account')
            		 }
            	  );
                 
                 
               if (response.statusCode = true)  {
            	   
            	   userService.getAccountData($scope.accountNumber, function (response) {
                   	$rootScope.accountDataInfonew = response.data;
                    $scope.intcharge = true;
                    $scope.showmindue = false;
              

                   	$scope.intCharged = $rootScope.accountDataInfonew.intCharged;
               });
            	   
            	   
               } 
                 
                 
                 
               
                 
  
                 }
              });
      
     
      
      
};   
  
//
$scope.chargeFee = function(){

	$location.path( "/calcfee" );

};  

$scope.transactionview = function(){

	$location.path( "/tran" );

};


//end of accrue interest logic.  
}]);
	  
	  
	  
	  
	  
	  
	  

