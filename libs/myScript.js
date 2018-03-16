var app = angular.module("demo", ['dndLists']);

app.controller("listCtrl", function($scope) {
    console.log("inside listCtrl...", $scope);

    $scope.user = {};
    $scope.players = [];
	$scope.selectedTeamMember = {};	
	
	/*$scope.validateAddedPlayer = function(item, type) {
		if($scope.user.teamMembers.length === 0) {
			return item;	
		} else if($scope.user.teamMembers && $scope.user.teamMembers.length > 0) {
			if(!_.find($scope.user.teamMembers, {'id':item.id})) {				
				return item;
			}		
		}
	};*/
	
	$scope.select = function(item) {
		$scope.selectedTeamMember = item;
	};
	
	$scope.remove = function(selectedTeamMember){
		_.remove($scope.user.teamMembers, {'id':selectedTeamMember.id});
		$scope.players.push(selectedTeamMember);
	};
	
	$scope.moved = function(player) {		
		_.remove($scope.players, {'id': player.id});		
	}


    $scope.user = {
        id: "1",
        email: "rahul@abc.com",
        position: 4,
        allowedTypes: ['batsman', 'bowler'],
        max: 4,
        teamMembers: [			
        ]
    };

    $scope.players = [{
            id: 1,
            name: "Rahul",
            country: "India",
            pointsScored: 10,
            experties: "bowler"
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
        {
            id: 6,
            name: "Anuj",
            country: "India",
            pointsScored: 0,
            experties: "batsman"
        },
        {
            id: 7,
            name: "Naveen",
            country: "India",
            pointsScored: 20,
            experties: "bowler"
        },
        {
            id: 9,
            name: "Richa",
            country: "India",
            pointsScored: 50,
            experties: "all rounder"
        },
        {
            id: 10,
            name: "Dinesh",
            country: "India",
            pointsScored: 50,
            experties: "all rounder"
        }
    ];
	
	$scope.bkpOfPlayers = angular.copy($scope.players);

});