//var model = require("../models/event.model.js")();
module.exports = function(app, EventModel){

    app.post("/api/event/organizer=:organizerId", createEvent);

    app.put("/api/event/:eventId", updateEvent);

    app.delete("/api/event/:eventId",deleteEvent);

    //
    app.get("/api/event", getAllEvents);

    app.get("/api/event/organizer=:organizerId", getEventsByOrganizerId);

    app.get("/api/event/:id", getEventById);
    
    app.get("/api/event/preference/lat/:lat/lng/:lng", getEventsByPreference);

    app.get("/api/event/:userId",getEventsByUserId);

    app.put("/api/event/:eventId/review", addReview);

    app.post("/api/event/:eventId/review", addReview);

//    app.put("/api/event", resetData);

    function addReview(req, res){
        console.log(req.body);
        var review = req.body;
        var eventId = req.params.eventId;
        EventModel.addReview(eventId, review).then(function(event){
            res.json(event);
        });

    }


    function createEvent(req, res){
        console.log(req.body);
        var event = req.body;
        var organizerId = req.params.organizerId;
        EventModel.create(organizerId,event).then(function(event){
            res.json(event);
        });

    }

    function updateEvent(req, res){
        var eventId = req.params.eventId;
        var event = req.body;
        console.log(eventId);
        EventModel.updateEvent(eventId, event).then(function(event){
            res.json(event);
        });
    }

    function deleteEvent(req, res){
        var id = req.params.id;
        EventModel.removeEvent(id).then(function(events){
            res.json(events);
        });
    }


    function getAllEvents(req, res){
        EventModel.getAllEvents().then(function(events){
            console.log(events);
            res.json(events);
        });
    }

    function getEventsByOrganizerId (req, res){
        var organizerId = req.params.organizerId;
        var event = req.body;
        EventModel.getEventsByOrganizerId(organizerId, event).then(function(events){
            res.json(events);
        });

    }

    function getEventById(req, res){
        var id = req.params.id;
        EventModel.getEventById(id).then(function(events){
            res.json(events);
        });
    }

    function getEventsByUserId(req, res){
        var userId = req.params.userId;
        EventModel.getEventsByUserId(userId).then(function(events){
            res.json(events);
        });

    }

    function getEventsByPreference(req, res){
        var lattitude = req.params.lat;
        var longitude = req.params.lng;
        var preference = req.body;
        EventModel.getEventsByPreference(preference.lattitude,longitude).then(function(events){
            res.json(events);
        });
    }


    function addReview(req, res){
        var eventid = req.params.eventId;
        var review = req.body;
        EventModel.addReview(eventid,review).then(function(events){
            res.json(events);
        });
    }


    function resetData(req, res){
        res.json(EventModel.resetData());
    }

}