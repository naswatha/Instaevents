"use strict";
(function(){
	angular
		.module("InstaEventsApp")
		.factory("EventService", EventService);
		
	function EventService($http, $q){
					
		var service = {
	  		createEvent: createEvent,
			getAllEvents: getAllEvents,
			getEventById: getEventById,
			getEventByOrganizerId: getEventByOrganizerId,
			getEventByUserId: getEventByUserId,
			updateEvent: updateEvent,
			deleteEvent: deleteEvent,
            addReview: addReview
		
		};
		return service;

	    
		function createEvent(orgId, event){  
		  var deferred = $q.defer();
            console.log(event);
            $http.post("/api/event/organizer="+orgId, event)
                .success(function(event){
					console.log(event);
                    deferred.resolve(event);
                });

            return deferred.promise;
		}
		
		function getAllEvents()
		{
			 var deferred = $q.defer();
			$http.get("/api/event")
		         .success(function(events){
                    deferred.resolve(events);
                });
                
            return deferred.promise;
		}
		
		function getEventById(id){
		    var deferred = $q.defer();
			$http.get("/api/event/"+id)
		         .success(function(event){
                    deferred.resolve(event);
                });
            return deferred.promise;
			}	
		
		function getEventByOrganizerId(organizerId){
		    var deferred = $q.defer();
			$http.get("/api/event/organizer="+organizerId)
		         .success(function(event){
                    deferred.resolve(event);
                });
            return deferred.promise;
			}
			
				
		function getEventByUserId(userId){
		    var deferred = $q.defer();
			$http.get("/api/event/user/"+userId)
		         .success(function(event){
                    deferred.resolve(event);
                });
            return deferred.promise;
			}
	   

		function deleteEvent(id)
		{
			 var deferred = $q.defer();
			$http.delete("/api/event/"+id)
                .success(function(event){
                    deferred.resolve(event);
                });
	       return deferred.promise;
		}
		
		function updateEvent(id, event){
		 var deferred = $q.defer();
			console.log("inside updateEvent service");
            $http.put("/api/event/"+id , event)
                .success(function(event){
                    deferred.resolve(event);
                });

            return deferred.promise;
			}

        function addReview(id, review){
            var deferred = $q.defer();
            console.log("inside updateEvent service");
            $http.post("/api/event/"+id+"/review" , review)
                .success(function(reviews){
                    deferred.resolve(reviews);
                });

            return deferred.promise;
        }
			
	}
		

			
})();
