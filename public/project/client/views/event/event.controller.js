"use strict";
(function(){
    angular
        .module("InstaEventsApp")
        .controller("EventController", EventController);
		
		
 function EventController($rootScope, $http, $routeParams, UserService, EventService) {
       var model = this;
       model.organizer = $rootScope.user;
       var userId = $rootScope.user._id;
       model.registerForEvent = registerForEvent;
       var eventId = $routeParams.eventid;
     model.eventId = eventId;
     model.addReview = addReview;
     console.log("This is eventId",eventId);

     if($rootScope.user.hasOwnProperty('createdEventIds') == true){
         model.isuser = false;
     }else{
         model.isuser = true;
     }

       function init(){
           EventService.getEventById(eventId)
               .then(function(event){
                   console.log(event);
                      model.event = event;
                   $rootScope.event = event;
                });
       }
     init();


           function registerForEvent(field){  
           EventService.updateEvent(userId, model.event)
             .then(function(event){
                 console.log(event.eventloc);

                  model.event = event;
                 console.log(model.event.lat);
                });
            };

     function addReview(){
         EventService.addReview(eventId, model.newreviews)
             .then(function(reviews){
                 model.event = reviews;
                 console.log(reviews);

             });
     };



 };
 })();