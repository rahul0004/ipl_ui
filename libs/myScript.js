var app = angular.module("demo", ['dndLists']);

app.controller("listCtrl", function($scope, $http, $window) {
    
    $scope.user = {};
    $scope.players = [];
	$scope.selectedTeamMember = {};
    $scope.error = false;
    $scope.errorMessage = "";

    $scope.listHeight = ($window.innerHeight - 40 - 40);
    console.log("h...", $scope.listHeight);

    $scope.userTeamConfig = {
        numberOfBatsmanAllowed: 5, 
        numberOfBowlerAllowed: 3, 
        numberOfAllRounderAllowed: 2, 
        numberOfForeginPlayerAllowed: 4, 
        numberOfUncappedPlayerAllowed: 2, 
        numberOfWicketkeeperAllowed: 1
    };

    $scope.submitMyTeam = function() {
        console.log("selected team",  $scope.user.teamMembers);
        if($scope.validateAddedPlayer()) {
            console.log("call api and save in db ");
            $http.post('libs/mockData/user.htm', $scope.user).then(function onSuccess(response){
                console.log("onSuccess ", response);
            }, function onError(response){
                console.log("onError ", response);
            });
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
                if(selectedTeamMember.playingRole.toLowerCase().indexOf('allrounder') != -1) {
                    numberOfAllRounder++;
                }
            }

            if(numberOfForeginPlayer > $scope.userTeamConfig.numberOfForeginPlayerAllowed) {
                $scope.error = true;
                $scope.errorMessage = "There are more than 4 foreign players in your team.";
            } else if(numberOfWicketkeeper > $scope.userTeamConfig.numberOfWicketkeeperAllowed) {
                $scope.error = true;
                $scope.errorMessage = "There are more than 1 wicket keeper in your team.";
            } else if(numberOfBatsman > $scope.userTeamConfig.numberOfBatsmanAllowed) {
                $scope.error = true;
                $scope.errorMessage = "There are more than 5 batsmen in your team.";
            } else if(numberOfBowler > $scope.userTeamConfig.numberOfBowlerAllowed) {
                $scope.error = true;
                $scope.errorMessage = "There are more than 3 bowlers in your team.";
            } else if(numberOfAllRounder > $scope.userTeamConfig.numberOfAllRounderAllowed) {
                $scope.error = true;
                $scope.errorMessage = "There are more than 2 All rounder in your team.";
            } else if(numberOfUncappedPlayer < $scope.userTeamConfig.numberOfUncappedPlayerAllowed) {
                $scope.error = true;
                $scope.errorMessage = "There are less than 2 Uncapped player in your team.";
            } else {
                console.log("allow ");
                allowToSubmit = true;
            }

            /*if( (numberOfForeginPlayer > $scope.userTeamConfig.numberOfForeginPlayerAllowed) || 
                (numberOfWicketkeeper > $scope.userTeamConfig.numberOfWicketkeeperAllowed) || 
                (numberOfBatsman > $scope.userTeamConfig.numberOfBatsmanAllowed) || 
                (numberOfBowler > $scope.userTeamConfig.numberOfBowlerAllowed) || 
                (numberOfAllRounder > $scope.userTeamConfig.numberOfAllRounderAllowed) || 
                (numberOfUncappedPlayer < $scope.userTeamConfig.numberOfUncappedPlayerAllowed) ) {
                console.log("do not allow ");
                allowToSubmit = false;
                $scope.error = true;
                $scope.errorMessage = "YOu have violated our team selection rules";
            } else {
                console.log("allow ");
                allowToSubmit = true;
            } */           		
		}
        return allowToSubmit;
	};
	
	$scope.select = function(item) {
		$scope.selectedTeamMember = item;
        console.log("selected ", $scope.selectedTeamMember);
	};

    $scope.move = function(item, type) {
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
        allowedTypes: ['batsman', 'bowler', 'allrounder'],
        max: 11,
        teamMembers: [			
        ]
    };

    $scope.bkpOfPlayers = angular.copy($scope.players);

    $scope.batsmen = [];

    $scope.bowlers = [];

    $scope.allrounders = [];

    $scope.createRoleArray = function() {
        console.log($scope.players);
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
        $scope.selectedTeamMember = $scope.batsmen[0];
    };


    $scope.isSelectedPlayerIsBatsman = function(selectedPlayer) {
        if((selectedPlayer.playingRole.toLowerCase().indexOf('batsman') >= 0) && 
            (selectedPlayer.playingRole.toLowerCase().indexOf('bowler') === -1) && 
            (selectedPlayer.playingRole.toLowerCase().indexOf('allrounder') === -1) ) {
            return true;
        } else {
            return false;
        }  
    };

    $scope.isSelectedPlayerIsBowler = function(selectedPlayer) { 
        if((selectedPlayer.playingRole.toLowerCase().indexOf('bowler') >= 0) && 
            (selectedPlayer.playingRole.toLowerCase().indexOf('batsman') === -1) && 
            (selectedPlayer.playingRole.toLowerCase().indexOf('allrounder') === -1) ) {
            return true;
        } else {
            return false;
        }  
    };

    $scope.isSelectedPlayerIsAllrounder = function(selectedPlayer) { 
        if((selectedPlayer.playingRole.toLowerCase().indexOf('allrounder') >= 0) && 
            (selectedPlayer.playingRole.toLowerCase().indexOf('bowler') === -1) && 
            (selectedPlayer.playingRole.toLowerCase().indexOf('batsman') === -1) ) {
            return true;
        } else {
            return false;
        }  
    };
    
    $scope.getPlayerList = function() {        
        //$http.get('http://10.214.208.22:3000/getPlayerList').then(function onSuccess(response){
        $http.get('libs/mockData/db_players.htm').then(function onSuccess(response){
             response.data.forEach(function(value, index, arr){
                var mapPlayer = {
                    pid: '',
                    country: '',
                    pointsScored: '',
                    playingRole: '',
                    majorTeams: '',
                    name: '' ,
                    battingStyle: '',
                    bowlingStyle: '',
                    category: '',
                    iplTeamName: ''
                };
                mapPlayer.pid = value.ipl_players_bio_id;
                mapPlayer.playingRole = (value.ipl_players_bio_playing_role) ? value.ipl_players_bio_playing_role : "Batsman";
                mapPlayer.country = value.ipl_players_bio_country;
                mapPlayer.name = value.ipl_players_bio_name;
                mapPlayer.battingStyle = value.ipl_players_bio_bat_style;
                mapPlayer.bowlingStyle = value.ipl_players_bio_bowl_style;
                mapPlayer.category = value.ipl_players_bio_category;
                mapPlayer.iplTeamName = value.ipl_team_name;
                $scope.players.push(mapPlayer);
             });
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

    $scope.getUserList = function() {
        $http.get('libs/mockData/allusers.htm').then(function onSuccess(response){
            $scope.allUsers = response.data.users;
        }, function onError(response){
            $scope.allUsers = [];
        });
    };

    try{
        $scope.getUserList();
    }catch(err){
        console.log("get all users ", err);
    }

    $scope.dropped = function(item, type) {
        /*
            this function is used in dnd-drop attr
            this empty function is delibrately created to takle issue regarding drop within same array 
            earlier without using this function, if user drags and drop one player in same list then it's removed by the 
            dnd-move attr.
            To keep the array intact when user drags and drop player in same list we override dnd-move with dnd-drop
        */
        //console.log("inside dropped ", item, type);
    };


});