"use strict";
(function(){
    angular
        .module("InstaEventsApp")
        .controller("HomeController", HomeController);
    function HomeController($rootScope, $http, $location, UserService, EventService) {
       var model = this;

        function init(){
            EventService.getAllEvents().then(function(events) {
                console.log(events);
                model.events = events;
            });
        }; init();
    }
})();