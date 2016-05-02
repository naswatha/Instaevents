(function(){
    "use strict";

    angular.module("InstaEventsApp")
        .factory("AuthService", AuthService);

    function AuthService($q, $timeout, $http){

        var user = null;

        var service = {
            isLoggedIn: isLoggedIn,
            getUserStatus: getUserStatus,
            login: login,
            logout: logout,
            register: register
        }

        function isLoggedIn(){
            if(user) return true;

            return false;
        }

        function getUserStatus(){
            return user;
        }

        function login(email, password, isOrg){
            var deferred = $q.defer();
            var url;

            if(isOrg) url = '/api/org/login';
            else url = '/api/user/login';

            $http.post(url, {email: email, password: password})
                .success(function(data, status){
                    if(status === 200 && data.status){
                        user = data;
                        deferred.resolve(user);
                    } else {
                        user = null;
                        deferred.reject();
                    }
                })
                .error(function(data){
                    user = null;
                    deferred.reject();
                });

            return deferred.promise;
        }

        function logout(){
            var deferred = $q.defer();


            return deferred.promise
        }

        function register(){

        }
        return service;
    }
})();