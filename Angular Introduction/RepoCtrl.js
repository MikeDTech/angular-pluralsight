(function() {

    var module = angular.module("githubViewer");

    var RepoCtrl = function($scope, github, $routeParams) {

        var onRepo = function(data) {
            $scope.repo = data;
        };

        var onError = function(reason) {
            $scope.error = reason;
        };

        var reponame = $routeParams.reponame;
        var username = $routeParams.username;

        github.getRepoDetails(username, reponame)
            .then(function(onRepo, onError);
    };

    module.controller("RepoCtrl", RepoCtrl);


}());