app.service('userService', [ '$http', function($http) {

	var getAccountData = function(accountNumber, callback) {

		if (accountNumber) {
			var options = {
				method : 'POST',
				url : 'http://localhost:8080/accountinquiry/',
				data : JSON.stringify({
					'accountNumber' : accountNumber
				}), // forms user object
				headers : {
					'Content-Type' : 'application/json',
					'Accept' : 'application/json'
				}
			}
		}

		$http(options).then(function(httpResponse) {
			callback(httpResponse)
		});

	}

	var serviceObj = {}
	serviceObj.getAccountData = getAccountData;
	return serviceObj;
} ])
