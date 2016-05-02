"use strict";
(function(){
    angular
        .module("InstaEventsApp")
        .controller("HeaderController", HeaderController);
    function HeaderController($rootScope, $http, $location, UserService) {
       var model = this;
       var isOrganizer = false;
       model.verify = verify;
       model.checkProfile = checkProfile;
       model.stateChanged = stateChanged;
       model.user = $rootScope.user;
       model.goHome = goHome;
       model.logout = logout;

       if ($rootScope.user == null){
            model.loggedin = false
       } else{
           model.loggedin = true
           }

       function stateChanged(){
           if (isOrganizer == false){
               isOrganizer = true;
           } else  isOrganizer = true;
       }

       function checkProfile(){
               if (model.user.hasOwnProperty('createdEventIds') == true){
                      $location.path("/orgprofile")
                  } else{
                  $location.path("/userprofile")
                  }
         };
       
       function verify(){
                  UserService.findUserByEmailAndPassword(isOrganizer, model.user.email,model.user.password)
                 .then(function(user){
                     if (user == null){
                         alert("Entered credentials do not exist. Check again")
                     } else {
                         model.user = user[0];
                         $rootScope.user = model.user;
                         if (model.user.hasOwnProperty('createdEventIds') == true) {
                             $location.path("/orghome")
                         } else {
                             $location.path("/userhome")
                         }
                     }
                });
         };
         
           function goHome(){
               if (model.user.hasOwnProperty('createdEventIds') == true){
                      $location.path("/orghome")
                  } else{
                  $location.path("/userhome")
                  }
         };
         
         function logout(){
             $rootScope.user = null;
              $location.path("/")
         };
    }
})();