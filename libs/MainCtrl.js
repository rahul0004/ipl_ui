var app = angular.module("demo", ["ui.router","dndLists"])
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
                templateUrl: "views/player-profile-card.html"                
              })
              .state("position", {
                url:"/position",
                templateUrl: "views/show-all-users.html"               
              })
          });

