var app = angular.module('ipl');

app.controller('UserPositionCtrl', function($scope){
	console.log("inside USer");
	console.log("...",$scope.allUsers);

	$scope.topHalfMembers = [];
	$scope.bottomHalfMembers = [];

	$scope.allUsers.forEach(function(value, index, arr){
		if(index < ($scope.allUsers.length / 2) ) {
			$scope.topHalfMembers.push(value);
		} else {
			$scope.bottomHalfMembers.push(value);
		}
	});

	console.log("topHalfMembers...", $scope.topHalfMembers);
	console.log("bottomHalfMembers...", $scope.bottomHalfMembers);
});