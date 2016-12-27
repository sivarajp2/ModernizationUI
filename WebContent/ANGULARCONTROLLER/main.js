var app = angular.module('Modernization_Data', [ 'ngRoute', 'ngResource','ui.bootstrap' ]);

// configure our routes
app.config(function ($httpProvider) {
	  $httpProvider.defaults.headers.common = {};
	  $httpProvider.defaults.headers.post = {};
	  $httpProvider.defaults.headers.put = {};
	  $httpProvider.defaults.headers.patch = {};
	});

app.config(['$routeProvider',function($routeProvider) {
      $routeProvider
      .when('/', {
 
            templateUrl : 'ANGULARVIEW/loginview.html',
            controller  : 'loginCntrl'
      })
      .when('/accountquery', {
 
            templateUrl :'ANGULARVIEW/accountquery.html',
            controller  : 'accountQueryCntrl'
      })
      
      .when('/calcfee', {
 
            templateUrl :'ANGULARVIEW/calcfee.html',
            controller  : 'calcFeeCntrl'
      })
      
      .when('/tran', {
 
            templateUrl :'ANGULARVIEW/tranview.html',
            controller  : 'tranCntrl'
      })
      .when('/account', {
 
            templateUrl :'ANGULARVIEW/account.html',
            controller  : 'accountCntrl'
      })  
   .otherwise({ redirectTo: '/'});
      
}])

.filter('startFrom',function(){
	  return function(data,start) {
		  if (!data || !data.length) { return; }
		   return data.slice(start);
	  }
 })

 
