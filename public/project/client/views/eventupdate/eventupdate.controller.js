"use strict";
(function(){
    angular
        .module("InstaEventsApp")
        .controller("EventUpdateController", EventUpdateController);


    function EventUpdateController($rootScope, $http, $routeParams, EventService) {
        var model = this;
        var userId = $rootScope.user._id;
        var eventId = $routeParams.eventId;
        model.update = update;
        console.log(eventId);


        function init(){
            EventService.getEventById(eventId).then(function(event) {
                console.log(event);
                model.event = event;
            });
        }; init();


        function update(){
            model.event.mdfdDt = Date.now();
            console.log(model.event);
            EventService.updateEvent(userId, model.event)
                .then(function(event){
                    console.log(event);
                    model.event = event;
                    // console.log(model.event.lat);
                });
        };

    };
})();