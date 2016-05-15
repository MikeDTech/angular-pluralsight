//Custom Service
(function() {

    var github = function($http) {

        var getUser = function(username) {
            return $http.get("https://api.github.com/users/" + username + "/repos")
                .then(function(response) {
                    return response.data;
                });
        };
        

        var getContributors = function(user) {
            return $http.get(user.contributors_url)
                .then(function(response) {
                    return response.data;
                });
        };



    return {
        getUser: getUser,
        getRepos: getRepos,
        getContributors: getContributors
      };


    };

    var module = angular.module("githubViewer");
    module.factory("github", github);

}());