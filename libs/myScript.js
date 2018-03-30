var app = angular.module("ipl");

app.controller("listCtrl", function($scope, $http, $window) {   
    

    $scope.submitMyTeam = function() {
        console.log("selected team",  $scope.loggedInUser.teamMembers);
        if($scope.validateAddedPlayer()) {
            console.log("call api and save in db ");
            $http.post('libs/mockData/user.htm', $scope.loggedInUser).then(function onSuccess(response){
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

		if($scope.loggedInUser.teamMembers.length === 0) {
			return allowToSubmit;	
		} else if($scope.loggedInUser.teamMembers && $scope.loggedInUser.teamMembers.length > 0) {
			for(var i=0; i < $scope.loggedInUser.teamMembers.length; i++) {
                var selectedTeamMember = $scope.loggedInUser.teamMembers[i];                
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
		_.remove($scope.loggedInUser.teamMembers, {'pid':selectedTeamMember.pid});		
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

    $scope.addPlayerInList = function(item) {        
        $scope.selectedTeamMember = item;
        return item;
    }


});