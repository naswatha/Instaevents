"use strict";
(function(){
    angular
        .module("InstaEventsApp")
        .controller("UserHomeController", UserHomeController);
    function UserHomeController($rootScope, $scope, UserService, EventService, ngDialog) {
       var model = this;

        model.preferences = $rootScope.user.preferences;

        function init(){
            EventService.getAllEvents().then(function(events) {
                console.log(events);
                model.events = events;

            });
        }; init();

        model.savePreference = function(preference){
            ngDialog.openConfirm({template: 'views/userhome/savePref.html',
                scope: $scope //Pass the scope object if you need to access in the template
            }).then(function(name){
                preference.name = name;

                UserService.createPreference($rootScope.user._id, preference).then(function(user){
                    model.preferences = user.preferences;
                });
            });
        }

        model.searchEvent = function(preference){
            console.log("...searching");
        }
    }
})();