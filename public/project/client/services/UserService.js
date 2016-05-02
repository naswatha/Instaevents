"use strict";
(function(){
	angular
		.module("InstaEventsApp")
		.factory("UserService", UserService);
		
	function UserService($http, $q){
					
		var service = {
			findAllUsers: findAllUsers,
			findUserByEmailAndPassword: findUserByEmailAndPassword,
			createUser: createUser,
			createOrg: createOrg,
			deleteUserById: deleteUserById,
			updateUser: updateUser,
			createPreference: createPreference,
			getPreferenceById: getPreferenceById,
			getPreferenceForUser: getPreferenceForUser,
            addEventForUser: addEventForUser
		};
		return service;
		
		function findAllUsers()
		{
			 var deferred = $q.defer();
			$http.get("/api/assignment/user")
		         .success(function(users){
                    deferred.resolve(users);
                });
                
            return deferred.promises;
		}
		
		function findUserByEmailAndPassword(isOrganizer, email, pword){
		    var deferred = $q.defer();
			console.log(isOrganizer);
			if (isOrganizer == false) {
				$http.get("/api/user/email="+email+"&password="+pword)
						.success(function (user) {
							console.log(user);
							deferred.resolve(user);
						});
				return deferred.promise;
			} else {
				$http.get("/api/org?email" + email)
						.success(function (org) {
							console.log(org);
							deferred.resolve(org);
						});
				return deferred.promise;
			}
			}	
		
	    
		function createUser(user){  
		  var deferred = $q.defer();
		  console.log(user);
            $http.post("/api/user",user)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
		}
		
		function createOrg(organizer){  
		  var deferred = $q.defer();
		  console.log(organizer);
            $http.post("/api/org",organizer)
                .success(function(organizer){
                    deferred.resolve(organizer);
                });

            return deferred.promise;
		}
		
		function deleteUserById(userid)
		{
			 var deferred = $q.defer();
			$http.delete("/api/assignment/user"+userid)
                .success(function(users){
                    deferred.resolve(users);
                });
	       return deferred.promise;
		}
		
		function updateUser(id, user){
		 var deferred = $q.defer();
            $http.put("/api/user/"+id , user)
                .success(function(users){
                    deferred.resolve(users);
                });

            return deferred.promise;
			}
			
			function getPreferenceById(userId, prefId){
				 var deferred = $q.defer();
			$http.get("/api/user/"+userId+"/preference/"+prefId)
		         .success(function(users){
                    deferred.resolve(users);
                });
                
            return deferred.promise;
			};
			
			function getPreferenceForUser(userId){
				 var deferred = $q.defer();
			$http.get("/api/user/"+userId+"/preference")
		         .success(function(users){
                    deferred.resolve(users);
                });
                
            return deferred.promise;
			};
			
			function createPreference(userId, preference){
		  var deferred = $q.defer();
		  		
            $http.post("/api/user/"+userId+"/preference",preference)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
			};

        function addEventForUser(userId, eventId){
            var deferred = $q.defer();

            $http.post("/api/user/"+userId+"/event/"+eventId)
                .success(function(organizer){
                    deferred.resolve(organizer);
                });

            return deferred.promise;
        };



    }
})();