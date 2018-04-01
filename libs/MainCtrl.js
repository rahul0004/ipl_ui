var app = angular.module("ipl", ["ui.router","dndLists"])
        .config(function($stateProvider, $urlMatcherFactoryProvider,$urlRouterProvider,$locationProvider) {
          $urlMatcherFactoryProvider.caseInsensitive(true);
          $urlRouterProvider.otherwise("/add");
          $locationProvider.html5Mode(true);
            $stateProvider
              .state("add", {
                url:"/add",
                templateUrl: "views/team-selection.html"                
              })
              .state("view", {
                url:"/view",
                templateUrl: "views/show-user-team.html"                
              })
              .state("position", {
                url:"/position",
                templateUrl: "views/show-all-users.html"               
              })
          });

        app.controller("MainCtrl", function($scope, $http, $window){

          //$scope.currentDate = new Date();
          $scope.currentDate = new Date('2018-04-12T14:30:00.000Z');

          $scope.loggedInUser = {};
          $scope.players = [];
          $scope.selectedTeamMember = {};
          $scope.error = true;
          $scope.errorMessage = "";
          $scope.allUsers = [];

          $scope.listHeight = ($window.innerHeight - 40 - 40);

          $scope.userTeamConfig = {
              numberOfBatsmanAllowed: 5, 
              numberOfBowlerAllowed: 3, 
              numberOfAllRounderAllowed: 2, 
              numberOfForeginPlayerAllowed: 4, 
              numberOfUncappedPlayerAllowed: 2, 
              numberOfWicketkeeperAllowed: 1,
              numberOfPlayersAllowed:11
          };

          $scope.loggedInUser = {
              id: 3,
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
                  $scope.allUsers = response.data;
              }, function onError(response){
                  $scope.allUsers = [];
              });
          };

          try{
              $scope.getUserList();
          }catch(err){
              console.log("get all users ", err);
          }


        });

