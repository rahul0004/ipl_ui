var app = angular.module("demo", ['dndLists']);

app.controller("listCtrl", function($scope, $http) {
    
    $scope.user = {};
    $scope.players = [];
	$scope.selectedTeamMember = {};
    $scope.error = false;
    $scope.errorMessage = "";

    $scope.userTeamConfig = {
        numberOfBatsmanAllowed: 3, //5
        numberOfBowlerAllowed: 1, //3
        numberOfAllRounderAllowed: 0, //2
        numberOfForeginPlayerAllowed: 1, //4
        numberOfUncappedPlayerAllowed: 1, //2
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
                if(selectedTeamMember.country.toLowerCase().indexOf('india') === -1) {
                    numberOfForeginPlayer++;
                } 
                if(selectedTeamMember.playingRole.toLowerCase().indexOf('wicketkeeper') != -1) {
                    numberOfWicketkeeper++;
                } 
                if(selectedTeamMember.playingRole.toLowerCase().indexOf('uncapped') != -1) {
                    numberOfUncappedPlayer++;
                } 
                if(selectedTeamMember.playingRole.toLowerCase().indexOf('batsman') != -1) {
                    numberOfBatsman++;
                }
                if(selectedTeamMember.playingRole.toLowerCase().indexOf('bowler') != -1) {
                    numberOfBowler++;
                }
                if(selectedTeamMember.playingRole.toLowerCase().indexOf('all rounder') != -1) {
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

    $scope.move = function(item, type) {
        //console.log(item, type);
        if(type === 'batsmen') {
            _.remove($scope.batsmen, {'pid': item.pid});
        } else if(type === 'bowler') {
            _.remove($scope.bowlers, {'pid': item.pid});
        } else if(type === 'allrounder') {
            _.remove($scope.allrounders, {'pid': item.pid});
        }
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
    
    $scope.getPlayerList = function() {
        $http.get('libs/players.htm').then(function onSuccess(response){
             $scope.players = response.data.players;
             $scope.createRoleArray();            
        }, function onError(response){
            $scope.players = [];
        });        
    };

    try{
        $scope.getPlayerList();
    }catch(err){
        console.log("get players ", err);
    }


});