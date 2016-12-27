app.controller('accountQueryCntrl',function($scope,$http, $location,$rootScope){
     var errmsg; 
     $scope.acct_no = ' ';
    	$scope.accountDetails=function(acct_no){
        
        if (!acct_no){
              alert("Please Enter ac number");
              return;
        }
        console.log(acct_no);
        $http(
                {
                	method : 'POST',
                    url : 'http://localhost:8080/accountinquiry/',
                    data : JSON.stringify({'accountNumber':acct_no}), // forms user object                                                      
                    headers : { 'Content-Type' : 'application/json','Accept':'application/json'}
                }).success(function(response) {
                      
                      var s1 = response;
                       $rootScope.accountDataInfo = response;  
                       localStorage.setItem('localAccountNumber',acct_no);
                       
                       
                       if(response.serviceStatus.errorCode == "100") 
                       {
                    	   $scope.errmsg = "Account Not Found: Retry";
                                          }
                       else {
                    	localStorage.setItem('CurrBal',$rootScope.accountDataInfo.currentBalance);
                       console.log($rootScope.accountDataInfo);
                      $location.path( "/account" );
                       }
                });
  };                  
});
