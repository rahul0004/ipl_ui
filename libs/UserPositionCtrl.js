var app = angular.module('ipl');

app.controller('UserPositionCtrl', function($scope, $http, $location, $anchorScroll, $timeout, $filter){
	
	//$scope.allUsers = $scope.allUsers.sort(function(a, b){return b-a});

	$scope.allUsers = $filter('orderBy')($scope.allUsers, 'points', 'reverse');


	$scope.upcomingMatches = [];
	$scope.topHalfMembers = [];
	$scope.bottomHalfMembers = [];

	$scope.allUsers.forEach(function(value, index, arr){
		if(index < ($scope.allUsers.length / 2) ) {
			$scope.topHalfMembers.push(value);
		} else {
			$scope.bottomHalfMembers.push(value);
		}
		$location.hash("user_"+$scope.loggedInUser.id);
		$anchorScroll();
	});

	
	Date.prototype.addHours= function(h){
	    this.setHours(this.getHours()+h);
	    return this;
	}

	Date.prototype.addMinutes= function(m){
	    this.setMinutes(this.getMinutes()+m);
	    return this;
	}

	$scope.scrollToTodaysMatch = function(upcomingMatches) {
	  	for(var i=0; i<upcomingMatches.length; i++) {
	  		var match = upcomingMatches[i];
	  		if(match.matchType === 'Twenty20') {
	  			var currentDate = $filter('date')($scope.currentDate);
	  			var matchDate = $filter('date')(match.dateTimeIST);
	  			if(currentDate === matchDate) {
	  				return match.matchId;	  				
	  			}
	  		}
	  	}
	}

	$scope.getAbbr = function(name) {
		var abbr = '';
		var obj = name.split(" ");
		for(var i in obj) {
			abbr+= obj[i].charAt(0).toLowerCase();
		}
		return abbr;
	};



	$scope.getUpcomingMatchesList = function() {
	      $http.get('libs/mockData/upcoming_matches.htm').then(function onSuccess(response){
	          //$scope.upcomingMatches = response.data.matches;	          
	          response.data.matches.forEach(function(value, index, arr){
	          	var obj = {
		          	matchId: 0,
		          	team1: '',
		          	team2: '',
		          	matchType:'',
				    matchDate:'',
				    dateTimeGMT:'',
				    dateTimeIST: '',
				    team1ImagePath:'',
				    team2ImagePath:'',
				    squad: false,
				    matchStarted: false
		        };
		        obj.matchId = value.unique_id;
		        obj.team1 = value["team-1"];
		        obj.team2 = value["team-2"];
		        obj.matchType = value.type;
		        obj.matchDate = value.date;
		        obj.dateTimeGMT = value.dateTimeGMT;
		        obj.dateTimeIST = new Date(value.dateTimeGMT);
		        obj.squad = value.squad;
		        obj.team1ImagePath = 'images/ipl-teams/'+$scope.getAbbr(value["team-1"])+'.png',
		        obj.team2ImagePath = 'images/ipl-teams/'+$scope.getAbbr(value["team-2"])+'.png',
		        obj.matchStarted = value.matchStarted;
		        $scope.upcomingMatches.push(obj);		        
	          });
	          console.log("upcoming matches ", $scope.upcomingMatches);
	          var hash = $scope.scrollToTodaysMatch($scope.upcomingMatches);	      
			  $location.hash(hash);
			  $anchorScroll();

	      }, function onError(response){
	          $scope.upcomingMatches = [];
	      });
	};

	  try{
	  		$timeout(function(){	  			
	      		$scope.getUpcomingMatchesList();	      		
	  		}, 200);	  			  		
	  }catch(err){
	      console.log("get all upcomingMatches ", err);
	  }
		
	  /*$scope.buildMockData = function() {
	  	var data = [];
	  	for(var i=1; i<=40; i++) {
	  		var obj = {
	  			id: i,
		        email: "player "+i+"@accenture.com",
		        points: (i * (Math.ceil(Math.random() * 9))),	        
		        teamMembers: [			
		        ]
	  		};
	  		data.push(obj);
	  	}
	  	console.log("data", data);
	  	var theJSON = JSON.stringify(data);
		var uri = "data:application/json;charset=UTF-8," + encodeURIComponent(theJSON);

		var a = document.createElement('a');
		a.href = uri;
		a.innerHTML = "Right-click and choose 'save as...'";
		document.body.appendChild(a);

	  };

	  $scope.buildMockData();*/

	  
});