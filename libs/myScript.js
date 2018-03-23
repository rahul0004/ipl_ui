var app = angular.module("demo", ['dndLists']);

app.controller("listCtrl", function($scope) {
    console.log("inside listCtrl...", $scope);

    $scope.user = {};
    $scope.players = [];
	$scope.selectedTeamMember = {};
    $scope.error = false;
    $scope.errorMessage = "";

    $scope.userTeamConfig = {
        numberOfBatsmanAllowed: 1,
        numberOfBowlerAllowed: 1,
        numberOfAllRounderAllowed: 0,
        numberOfForeginPlayerAllowed: 1,
        numberOfUncappedPlayerAllowed: 1,
        numberOfWicketkeeperAllowed: 1
    };

    $scope.submitMyTeam = function() {
        console.log("selected team",  $scope.user.teamMembers);
        if($scope.validateAddedPlayer()) {
            console.log("call api and save in db ");
        } else {
            console.log("show error");
        }
    };
	
	$scope.validateAddedPlayer = function() {
        var allowToSubmit = false;
        var numberOfBatsman = 0;
        var numberOfBowler = 0;
        var numberOfAllRounder = 0;
        var numberOfForeginPlayer = 0;
        var numberOfUncappedPlayer = 0;
        var numberOfWicketkeeper = 0;

		if($scope.user.teamMembers.length === 0) {
			return allowToSubmit;	
		} else if($scope.user.teamMembers && $scope.user.teamMembers.length > 0) {
			for(var i=0; i < $scope.user.teamMembers.length; i++) {
                var selectedTeamMember = $scope.user.teamMembers[i];
                /* order of if-else is essential as wicketkeeper can an batsman 
                    an uncapped player can be batsman or bowler */
                if(selectedTeamMember.country.toLowerCase().indexOf('india') === -1) {
                    numberOfForeginPlayer++;
                } else if(selectedTeamMember.playingRole.toLowerCase().indexOf('wicketkeeper') != -1) {
                    numberOfWicketkeeper++;
                } else if(selectedTeamMember.playingRole.toLowerCase().indexOf('uncapped') != -1) {
                    numberOfUncappedPlayer++;
                } else if(selectedTeamMember.playingRole.toLowerCase().indexOf('batsman') != -1) {
                    numberOfBatsman++;
                } else if(selectedTeamMember.playingRole.toLowerCase().indexOf('bowler') != -1) {
                    numberOfBowler++;
                } else if(selectedTeamMember.playingRole.toLowerCase().indexOf('all rounder') != -1) {
                    numberOfAllRounder++;
                }
            }
            if( (numberOfForeginPlayer > $scope.userTeamConfig.numberOfForeginPlayerAllowed) || 
                (numberOfWicketkeeper > $scope.userTeamConfig.numberOfWicketkeeperAllowed) || 
                (numberOfBatsman > $scope.userTeamConfig.numberOfBatsmanAllowed) || 
                (numberOfBowler > $scope.userTeamConfig.numberOfBowlerAllowed) || 
                (numberOfAllRounder > $scope.userTeamConfig.numberOfAllRounderAllowed) || 
                (numberOfUncappedPlayer > $scope.userTeamConfig.numberOfUncappedPlayerAllowed) ) {
                console.log("do not allow ");
                allowToSubmit = false;
                $scope.error = true;
                $scope.errorMessage = "YOu have violated our team selection rules";
            } else {
                console.log("allow ");
                allowToSubmit = true;
            }            		
		}
        return allowToSubmit;
	};
	
	$scope.select = function(item) {
		$scope.selectedTeamMember = item;
	};
	
	$scope.remove = function(selectedTeamMember){
		_.remove($scope.user.teamMembers, {'pid':selectedTeamMember.pid});
		$scope.players.push(selectedTeamMember);
        $scope.error = false;
        $scope.errorMessage = "";
	};
	
	$scope.moved = function(player) {		
		_.remove($scope.players, {'pid': player.pid});
        $scope.error = false;
        $scope.errorMessage = "";        	
	}


    $scope.user = {
        id: "1",
        email: "rahul@abc.com",
        position: 4,
        allowedTypes: ['batsman', 'bowler', 'all rounder'],
        max: 4,
        teamMembers: [			
        ]
    };

    $scope.players2 = [
        {
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

    $scope.players = [
        {
            "pid": 1,
            "country": "India",
            "pointsScored": 10,
            "playingRole": "Wicketkeeper batsman",
            "majorTeams": "India,Abahani Limited,Albert TUTI Patriots,Delhi Daredevils,Gujarat Lions,India A,India Blue,India Under-19s,Indian Board President's XI,Kings XI Punjab,Mumbai Indians,Royal Challengers Bangalore,South Zone,Tamil Nadu",
            "name": "Dinesh Karthik"
        },
            {
            "pid": 2,
            "country": "India",
            "pointsScored": 10,
            "playingRole": "Wicketkeeper batsman",
            "majorTeams": "India,Abahani Limited,Albert TUTI Patriots,Delhi Daredevils,Gujarat Lions,India A,India Blue,India Under-19s,Indian Board President's XI,Kings XI Punjab,Mumbai Indians,Royal Challengers Bangalore,South Zone,Tamil Nadu",
            "name": "Dhoni"
        },
        {
            "pid": 3,            
            "country": "India",
            "pointsScored": 10,
            "playingRole": "Batsman",
            "majorTeams": "India,Abahani Limited,Albert TUTI Patriots,Delhi Daredevils,Gujarat Lions,India A,India Blue,India Under-19s,Indian Board President's XI,Kings XI Punjab,Mumbai Indians,Royal Challengers Bangalore,South Zone,Tamil Nadu",
            "name": "Rohit Sharma"
        },
        {
            "pid": 4,            
            "country": "India",
            "pointsScored": 10,
            "playingRole": "Bowler",
            "majorTeams": "India,Abahani Limited,Albert TUTI Patriots,Delhi Daredevils,Gujarat Lions,India A,India Blue,India Under-19s,Indian Board President's XI,Kings XI Punjab,Mumbai Indians,Royal Challengers Bangalore,South Zone,Tamil Nadu",
            "name": "Ashish Nehra"
        },
        {
            "pid": 5,            
            "country": "India",
            "pointsScored": 10,
            "playingRole": "All Rounder",
            "majorTeams": "India,Abahani Limited,Albert TUTI Patriots,Delhi Daredevils,Gujarat Lions,India A,India Blue,India Under-19s,Indian Board President's XI,Kings XI Punjab,Mumbai Indians,Royal Challengers Bangalore,South Zone,Tamil Nadu",
            "name": "Hardik Pandya"
        },
        {
            "pid": 6,            
            "country": "India",
            "pointsScored": 10,
            "playingRole": "Uncapped bowler",
            "majorTeams": "Abahani Limited,Albert TUTI Patriots,Delhi Daredevils,Gujarat Lions,India A,India Blue,India Under-19s,Indian Board President's XI,Kings XI Punjab,Mumbai Indians,Royal Challengers Bangalore,South Zone,Tamil Nadu",
            "name": "Prithvi Shaw"
        },
        {
            "pid": 7,            
            "country": "Australia",
            "pointsScored": 10,
            "playingRole": "Batsman",
            "majorTeams": "India,Abahani Limited,Albert TUTI Patriots,Delhi Daredevils,Gujarat Lions,India A,India Blue,India Under-19s,Indian Board President's XI,Kings XI Punjab,Mumbai Indians,Royal Challengers Bangalore,South Zone,Tamil Nadu",
            "name": "A.B.Devilers"
        }
    ];

});