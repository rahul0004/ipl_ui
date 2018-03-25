var app = angular.module("demo", ['dndLists']);

app.controller("listCtrl", function($scope) {
    console.log("inside listCtrl...", $scope);

    $scope.user = {};
    $scope.players = [];
	$scope.selectedTeamMember = {};
    $scope.error = false;
    $scope.errorMessage = "";

    $scope.userTeamConfig = {
        numberOfBatsmanAllowed: 3,
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
        if($scope.isSelectedPlayerIsBatsman(selectedTeamMember)) {
            $scope.batsmen.push(selectedTeamMember);
        } else if($scope.isSelectedPlayerIsBowler(selectedTeamMember)) {
            $scope.bowlers.push(selectedTeamMember);
        } else if($scope.isSelectedPlayerIsAllrounder(selectedTeamMember)) {
            $scope.allrounders.push(selectedTeamMember);
        }
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
        },
        {
            "pid": 8,            
            "country": "India",
            "pointsScored": 10,
            "playingRole": "Batsman",
            "majorTeams": "",
            "name": "Virat Kohli"
        },
        {
            "pid": 9,            
            "country": "India",
            "pointsScored": 10,
            "playingRole": "Batsman",
            "majorTeams": "",
            "name": "Gautam Gambhir"
        },
        {
            "pid": 10,            
            "country": "India",
            "pointsScored": 10,
            "playingRole": "Batsman",
            "majorTeams": "",
            "name": "Virendra Sehwag"
        },
        {
            "pid": 11,            
            "country": "Sri Lanka",
            "pointsScored": 10,
            "playingRole": "Batsman",
            "majorTeams": "",
            "name": "T. Dilshan"
        }
    ];

    $scope.bkpOfPlayers = angular.copy($scope.players);

    $scope.batsmen = [];

    $scope.bowlers = [];

    $scope.allrounders = [];

    $scope.createRoleArray = function() {
        for(var i=0; i < $scope.players.length; i++){
            var selectedPlayer = $scope.players[i];
            if($scope.isSelectedPlayerIsBatsman(selectedPlayer)) {
                $scope.batsmen.push(selectedPlayer);
            } else if($scope.isSelectedPlayerIsBowler(selectedPlayer)) {
                $scope.bowlers.push(selectedPlayer);
            } else if($scope.isSelectedPlayerIsAllrounder(selectedPlayer)) {
                $scope.allrounders.push(selectedPlayer);
            }
        }
    };


    $scope.isSelectedPlayerIsBatsman = function(selectedPlayer) {
        if((selectedPlayer.playingRole.toLowerCase().indexOf('batsman') >= 0) && 
            (selectedPlayer.playingRole.toLowerCase().indexOf('bowler') === -1) && 
            (selectedPlayer.playingRole.toLowerCase().indexOf('all rounder') === -1) ) {
            return true;
        } else {
            return false;
        }  
    };

    $scope.isSelectedPlayerIsBowler = function(selectedPlayer) { 
        if((selectedPlayer.playingRole.toLowerCase().indexOf('bowler') >= 0) && 
            (selectedPlayer.playingRole.toLowerCase().indexOf('batsman') === -1) && 
            (selectedPlayer.playingRole.toLowerCase().indexOf('all rounder') === -1) ) {
            return true;
        } else {
            return false;
        }  
    };

    $scope.isSelectedPlayerIsAllrounder = function(selectedPlayer) { 
        if((selectedPlayer.playingRole.toLowerCase().indexOf('all rounder') >= 0) && 
            (selectedPlayer.playingRole.toLowerCase().indexOf('bowler') === -1) && 
            (selectedPlayer.playingRole.toLowerCase().indexOf('batsman') === -1) ) {
            return true;
        } else {
            return false;
        }  
    };

    try{
        $scope.createRoleArray();
    }catch(err) {
        console.log("error in createRoleArray function ", err);
    }        

    console.log("batsmen..", $scope.batsmen);
    console.log("bowlers..", $scope.bowlers);
    console.log("allrounders..", $scope.allrounders);


});