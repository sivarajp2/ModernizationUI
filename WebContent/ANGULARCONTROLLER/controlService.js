(function() {
	angular.module('Modernization_Data').factory('controlService',
			controlService);
	controlService.$inject = [ '$http', '$q' ];
	function controlService($http, $q) {
		return {
			retrieveControl : function(accountNumber) {

				var options = {
					method : 'POST',
					url : 'http://localhost:8080/controlinquiry/',
					data : accountNumber, // forms user object
					headers : {
						'Content-Type' : 'application/json',
						'Accept' : 'application/json'
					}
				}

				return $http(options).then(function(response) {
					return response.data;
				}, function(errResponse) {
					return $q.reject(errResponse);
				});
			},

			loadAccount : function(accountNumber) {
				var options = {
					method : 'POST',
					url : 'http://localhost:8080/accountinquiry/',
					data : JSON.stringify({
						'accountNumber' : accountNumber
					}),
					headers : {
						'Content-Type' : 'application/json',
						'Accept' : 'application/json'
					}
				}

				return $http(options).then(function(response) {
					return response.data;
				}, function(errResponse) {
					return $q.reject(errResponse);
				});
			},

			updateMinDue : function(accountNumber, mindue, currentBalance) {
				var options = {
					method : 'POST',
					url : 'http://localhost:8080/updatemindue/',
					data : JSON.stringify({
						'accountNumber' : accountNumber,
						'minimumduepercent' : mindue,
						'currentBalance' : currentBalance
					}), // forms user object
					headers : {
						'Content-Type' : 'application/json',
						'Accept' : 'application/json'
					}
				}

				return $http(options).then(function(response) {
					return response.data;
				}, function(errResponse) {
					return $q.reject(errResponse);
				});
			},

			accrueInterest : function(accountNumber, intApr, currentBalance,
					intCharged) {
				var options = {
					method : 'POST',
					url : 'http://localhost:8080/updateinterest/',
					data : JSON.stringify({
						'accountNumber' : accountNumber,
						'apr' : intApr,
						'transactionAmount' : currentBalance,
						'interestAccrued' : intCharged
					}), // forms user object
					headers : {
						'Content-Type' : 'application/json',
						'Accept' : 'application/json'
					}
				}

				return $http(options).then(function(response) {
					return response.data;
				}, function(errResponse) {
					return $q.reject(errResponse);
				});
			},

			postTransaction : function(accountnumber, transactionamount,
					transactioncode, transactiontypes, transactiondesc,
					transactiondate, transactiondate, feecharged,
					currentbalance) {
				var options = {
					method : 'POST',
					url : 'http://localhost:8080/updatefee/',
					data : JSON.stringify({
						'accountNumber' : accountnumber,
						'transactionAmount' : transactionamount,
						'transactionCode' : transactioncode,
						'transactionType' : transactiontypes,
						'transactionDesc' : transactiondesc,
						'transactionDate' : transactiondate,
						'transactionEffectiveDate' : transactiondate,
						'chargedFee' : feecharged,
						'currentBalance' : currentbalance
					}), // forms user object
					headers : {
						'Content-Type' : 'application/json',
						'Accept' : 'application/json'
					}
				}

				return $http(options).then(function(response) {
					return response.data;
				}, function(errResponse) {
					return $q.reject(errResponse);
				});
			},

			retrievetran : function(accountnumber, mytimestamp) {
				var options = {
					method : 'POST',
					url : 'http://localhost:8080/transactioninquiry/',
					data : JSON.stringify({
						'accountNumber' : accountnumber,
						'mytimestamp' : mytimestamp
					}), // forms user object
					headers : {
						'Content-Type' : 'application/json',
						'Accept' : 'application/json'
					}
				}

				return $http(options).then(function(response) {
					return response.data;
				}, function(errResponse) {
					return $q.reject(errResponse);
				});
			}

		}
	}
})();