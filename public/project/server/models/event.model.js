//var events = require("./event.mock.json");
//var userModel = require("./user.model.js")();
//var uuid = require("node-uuid");
var q = require("q");


module.exports = function(mongoose, db, OrganizerModel, UserModel){

    console.log(OrganizerModel);
    var EventSchema = require("./event.schema.js")(mongoose);
    var OrganizerSchema = require("./organizer.schema.js")(mongoose);
    var UserSchema = require("./user.schema.js")(mongoose);

    var EventModel  = mongoose.model("EventModel", EventSchema);
    //var OrganizerModel = mongoose.model("OrganizerModel", OrganizerSchema);
    //var UserModel  = mongoose.model("UserModel", UserSchema);

    var api = {
        create: create,
        updateEvent: updateEvent,
        getEventById: getEventById,
        getAllEvents: getAllEvents,
        getEventsByOrganizerId: getEventsByOrganizerId,
        getEventsByPreference: getEventsByPreference,
        getEventsByUserId: getEventsByUserId,
        addReview: addReview,
        removeEvent: removeEvent,

    }

    return api;



    function distance(lat1, lon1, lat2, lon2) {

        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var radlon1 = Math.PI * lon1/180
        var radlon2 = Math.PI * lon2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        return dist
    }


    function getEventsByPreference(preference, lattitude, longitude){
         var deferred = q.defer();
         var prefferedEvents;

         //var currentDateTime = new Date();
        
         
         EventModel.find({$and: [
                                {type: preference.eventType},
                                {price:{$lt: preference.cost}},
                                {crtnDt: {$gte: new Date.now}}
                                ]},function(err,prefEvents){

            if(prefEvents){

                for(var i = 0; i < prefEvents.length; i++){

                    var dist = distance(lattitude, longitude, prefEvents[i].eventLocation.lat, prefEvents[i].eventLocation.long);

                    if(dist <= preference.locationRange){

                        prefferedEvents.push(prefEvents[i]);
                    }

                }
            }

            if(prefferedEvents){
                deferred.resolve(prefferedEvents);
            }

            else
                deferred("No events found");
            
        });
        
        return deferred.promise;
    }

    function getEventsByOrganizerId(organizerId){
        
       var deferred = q.defer();
       //var createdEvents;

            EventModel.find({creatorId: organizerId },function(err, events){
                if(err){
                    deferred.reject(err);
                } else
                    deferred.resolve(events);
            });

            return deferred.promise;
    }
    
    function create(organizerId, event){
        
        var deffered = q.defer();
        
        //need to consider some other parameter to validate event creation.
        // and add the organizer id to creator id.
        EventModel.findOne({and:{title: event.title, creatorID : organizerId}}, function(err, found){

            if(found){
                deffered.reject("Event with the name already exists for this particular organizer");
            }
            else{
                EventModel.create(event, function(err, created){
                      if(created) {
                        console.log("inside create",created);
                        OrganizerModel.getOrganizerById(organizerId).then(function(org){
                            console.log(org);
                            org.createdEventIds.push(created._id);
                            OrganizerModel.updateOrganizer(org._id, org).then(function(response){
                                console.log(response);
                            })
                          });
                                deffered.resolve(created);
                            } else  deffered.reject("error while creating event");
                })

            }
        });
        return deffered.promise;
    }
       
    function updateEvent(id, event){
            var deferred = q.defer();
            delete event._id;
        delete event.crtnDt;
        delete event.mdfdDt;
        delete event.__v;
        console.log(id, event);
            EventModel.update({_id: id},event,function(err, updatedEvent){
                console.log("in updateEvent", updatedEvent);
                deferred.resolve(updatedEvent);
            });


        return deferred.promise;
    }


    function removeEvent(event){

            var deferred = q.defer();
            EventModel.remove({_id: event._id}, function(err, events){
                deferred.resolve(events);
            });

            return deferred.promise;
        }

    function getEventsByUserId(userId){

        var deffered = q.defer();

        var eventAttendByUser;

        var currentDateTime = new Date();

        UserModel.findById(userId, function(err, user){

            if(user){
                var eventArr = user.attendingEventIds;

                for(var i = 0; i < eventArr.length; i++){

                    EventModel.findById(eventArr[i], function(err, event){

                        if(event){
                            eventAttendByUser.push(event);
                        }

                    });
                }

                deffered.resolve(eventAttendByUser);
            }            
            else{

                deffered("User does not attending any event");
            }

        });
        
        return deffered.promise;
    }



    function getEventById(eventId){

            var deferred = q.defer();

            EventModel.findById(eventId, function(err, event){

                deferred.resolve(event);
            });

            return deferred.promise;
    }

    function getAllEvents(){

            var deferred = q.defer();

            EventModel.find(function(err, events){
                console.log(events);
                deferred.resolve(events);
            });

            return deferred.promise;

    }


    function addReview(eventId, newReview){

            var deferred = q.defer();
            console.log(eventId);
            EventModel.findById(eventId, function(err, event){
                console.log(event);
                event.reviews.push(newReview);
                var reviewArr = event.reviews;
                var avgRating = 0;
                for(var i =0; i < reviewArr.length; i++){

                    avgRating += reviewArr[i].rating;
                }
                avgRating = avgRating/reviewArr.length;
                event.averageRating = avgRating;



                event.save(function(err, event){
                    deferred.resolve(event);
                });
            });

            return deferred.promise;
        }
}
