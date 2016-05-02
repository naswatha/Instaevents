"use strict";
(function(){
    angular
        .module("InstaEventsApp")
        .controller("UserProfileController", UserProfileController);
    function UserProfileController($rootScope, $http, UserService) {
        
       var model = this;
       model.user = $rootScope.user,
       model.update = update;
           
      function update(){
            UserService.updateUser($rootScope.user.id, model.user)
             .then(function(user){
                  model.user = user;
                 $rootScope.user = model.user;
               });
       };
    }
})();