"use strict";
(function(){
    angular
        .module("InstaEventsApp")
        .controller("RegisterController", RegisterController);
    function RegisterController( $http, $rootScope, $location, UserService) {
       var model = this;
       model.register = register;
        model.registerorg = registerorg;
                     
         function register (reguser){
            
            if (reguser.password != model.verifypassword){
                alert("Entered Passwords do not match. Please enter again.")
            } else {
                 UserService.createUser(reguser)
                    .then(function(user){
                        console.log(user);
                    model.user = user;
                    $rootScope.user = user;
                   $location.path("/userhome")
                });
           };
        };
        
        function registerorg (regorg){
            console.log("in registerorg");
               if (regorg.password != model.verifypassword){
                alert("Entered Passwords do not match. Please enter again.")
            } else {
                regorg.createdEventIds = [];
            UserService.createOrg(regorg)
                    .then(function(org){
                    model.user = org;
                    $rootScope.user = org;
                   $location.path("/orghome")
                });
           };
        };
     }
})();