"use strict";
(function(){
    angular
        .module("InstaEventsApp")
        .controller("OrganizerEventController", OrganizerEventController);
    function OrganizerEventController($rootScope, $http, $location, EventService) {
       var model = this;
        var orgId = $rootScope.user._id;
        model.deleteEvent = deleteEvent;
        model.organizer = $rootScope.user
        //model.event = $rootScope.event;

        function init(){
            EventService.getEventByOrganizerId(orgId).then(function(events) {
                console.log(events);
                   model.events = events;
            });
    }; init();



       function deleteEvent(eventid){
           EventService.deleteEvent(eventid).then(function(events) {
               console.log(events);
               model.events = events;
           });
       };
    };
      
})();