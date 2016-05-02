"use strict";
(function(){
    angular
        .module("InstaEventsApp")
        .controller("OrgProfileController", OrgProfileController);
    function OrgProfileController($rootScope, $http, UserService) {
        
       var model = this;
       model.user = $rootScope.user,
       model.update = update;
           
      function update(){
            UserService.updateUser($rootScope.user._id, model.user)
             .then(function(user){
                 console.log(user);
                  model.user = user;
                  $rootScope.user = model.user;
               });
       };
    }
})();