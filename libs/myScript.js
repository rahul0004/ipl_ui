var app = angular.module("demo", ['dndLists']);

app.controller("listCtrl", function($scope) {
	console.log("inside listCtrl...", $scope);

	$scope.user = {};
	$scope.players = [];


	$scope.user = {
		id: "1",
		email: "rahul@abc.com",
		position: 4,
		allowedTypes: ['batsman', 'bowler'],
		max: 4,
		teamMembers: [
			{
				id: 1,
				name: "Anuj",
				country: "India",
				pointsScored: 0,
				experties: "batsman"
			},
			{
				id: 2,
				name: "Naveen",
				country: "India",
				pointsScored: 20,
				experties: "batsman"
			}
		]
	};

	$scope.players = [
		{
			id: 1,
			name: "Rahul",
			country: "India",
			pointsScored: 10,
			experties: "None"
		},
		{
			id: 2,
			name: "Aniket",
			country: "India",
			pointsScored: 20,
			experties: "batsman"
		},
		{
			id: 3,
			name: "Suraj",
			country: "India",
			pointsScored: 20,
			experties: "batsman"
		},
		{
			id: 4,
			name: "Vaibhav",
			country: "India",
			pointsScored: 30,
			experties: "bowler"
		},
		{
			id: 5,
			name: "Vijay",
			country: "India",
			pointsScored: 30,
			experties: "all rounder"
		},

	];

});