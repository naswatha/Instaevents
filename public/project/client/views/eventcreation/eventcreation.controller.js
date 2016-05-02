"use strict";
(function(){
    angular
        .module("InstaEventsApp")
        .controller("EventCreationController", EventCreationController);
		
		
 function EventCreationController($scope, $rootScope, $http, $routeParams, EventService) {
       var model = this;
       var userId = $rootScope.user._id;
       model.create = create;
     model.geolocate=geolocate;
     console.log("in event controller");
     model.eventexists = $rootScope.event;
     
           function create(){
               console.log("in event creation");
               model.event.crtnDt = Date.now();
               model.event.creatorId = userId;
               model.event.reviews = [];
            EventService.createEvent(userId, model.event)
             .then(function(event){
                  console.log(event);
                  model.event = event;
             });
            };

     function update(){
         model.event.crtnDt = Date.now();
         console.log(model.event.eventLocation.lat);
         EventService.updateEvent(userId, model.event)
             .then(function(event){
                 console.log(event);
                 model.event = event;
                 console.log(model.event.eventLocation.lat);
             });
     };

     function geolocate() {
         var address = (document.getElementById('eventAddr'));
         var autocomplete = new google.maps.places.Autocomplete(address);
         autocomplete.setTypes(['geocode']);
         google.maps.event.addListener(autocomplete, 'place_changed', function() {
             var place = autocomplete.getPlace();
             if (!place.geometry) {
                 return;
             }
             document.getElementById('eventAddr').value = place.formatted_address;
             var geocoder = new google.maps.Geocoder();
             var address = document.getElementById("eventAddr").value;
             geocoder.geocode( { 'address': address}, function(results, status) {
                 if (status == google.maps.GeocoderStatus.OK) {
                     document.getElementById("latAddr").value=results[0].geometry.location.lat();
                     document.getElementById("lngAddr").value=results[0].geometry.location.lng();
                     alert(document.getElementById("latAddr").value);
                     alert(document.getElementById("lngAddr").value);
                     model.event.eventLocation.lat = document.getElementById("latAddr").value;
                     model.event.eventLocation.long = document.getElementById("lngAddr").value;
                 }
                 else {
                     alert("Please enter valid address. For the following reason: " + status);
                 }
             });
         });
     }

         

 }})();