/* Methods: Avoid Global Variables */
(function() {

    var app = angular.module("app", []);

    var MainCtrl = function($scope, github, $http, $interval, $log, $anchorScroll, $location) {

        var onUserComplete = function(data) {
            $scope.user = data;
            github.getRepos($scope.user)
                .then(onRepos, onError);
        };

        var onRepos = function(data) {
            $scope.repos = data;
            $location.hash("target");
            $anchorScroll();
        };




// Services Have $ signs in front of them,
// $scope, $http, $interval, $timeout, $log, $animate, $location, $browser, $window

// UI Related Services
// $anchorScroll $animate $location $browser $window


        var onError = function(reason) {
            $scope.error = "Could not fetch the file";
        };

        var decrementCountdown = function() {
            $scope.countdown -= 1;
            if($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        };
        
        var countdownInterval = null;
        var startCountdown = function() {
          countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown); // Name of Fx to Call, 1000ms time of countdown, number of times to repeat
        };

        $scope.search = function(username) {
            $log.info("Searching for " + username);
            github.getUser(username).then(onUserComplete, onError);
            if(countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }

        };

        $scope.username = "angular";
        $scope.message = "GitHub Viewer";
        $scope.repoSortOrder = '-stargazers_count';
        $scope.countdown = 5;
        startCountdown();

    };

    app.controller("MainCtrl", MainCtrl);


}());