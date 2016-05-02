//var model = require("../models/user.model.js")();

module.exports = function(app, OrganizerModel) {


    app.post("/api/org", createOrganizer);

    app.put("/api/org/:id", updateOrganizer);

    app.delete("/api/org/:id", removeOrganizer);

    app.get("/api/org?email", getOrganizerByEmail);

    app.get("/api/org/:id", getOrganizerById);

    app.get("/api/org?name", getOrganizerByName);

    app.get("/api/org", getAllOrganizers);

    app.post("/api/org/:orgId/event/:eventId", addEvent);

    app.delete("/api/org/:orgId/event/:eventId", removeEvent);

    app.post("/api/org/:orgId/payment/:paymentId", addPayment);

    app.delete("/api/org/:orgId/payment/:paymentId", removePayment);

    app.delete("/api/org", deleteAll);

    app.get("/api/org/:id/event", getCreatedEventIds);
    app.get("/api/org/:id/payment", getPaymentIds);

    function getCreatedEventIds(req, res){
        var id = req.params.id;
        OrganizerModel.getCreatedEventIds(id).then(function(events){
            res.json(events);
        });
    }

    function getPaymentIds(req, res){
        var id = req.params.id;
        OrganizerModel.getPaymentIds(id).then(function(payments){
            res.json(payments);
        });
    }

    function getAllOrganizers(req, res){

        OrganizerModel.getAllOrganizers().then(function(orgs){
            res.json(orgs);
        });
    }

    function createOrganizer(req, res){
        var org = req.body;

        OrganizerModel.createOrganizer(org).then(function(response){
            res.json(response);
        });
    }

    function updateOrganizer(req, res){
        var id = req.params.id;
        var org = req.body;

        OrganizerModel.updateOrganizer(id, org).then(function(response){
            res.json(response);
        });
    }

    function removeOrganizer(req, res){
        var id = req.params.id;

        OrganizerModel.removeOrganizer(id).then(function(response){
            res.json(response);
        });
    }

    function getOrganizerByEmail(req, res){
        var email = req.query.email;

        OrganizerModel.getOrganizerByEmail(email).then(function(response){
            res.json(response);
        });
    }

    function getOrganizerById(req, res){
        var id = req.params.id;

        OrganizerModel.getOrganizerById(id).then(function(response){
            res.json(response);
        });
    }

    function getOrganizerByName(req, res){
        var name = req.query.name;

        OrganizerModel.getOrganizerByName(name).then(function(response){
            res.json(response);
        });

    }

    function addEvent(req, res){
        var orgId = req.params.orgId;
        var eventId = req.params.eventId;

        OrganizerModel.addEvent(orgId, eventId).then(function(response){
            res.json(response);
        });
    }

    function removeEvent(req, res){
        var orgId = req.params.orgId;
        var eventId = req.params.eventId;

        OrganizerModel.removeEvent(orgId, eventId).then(function(response){
            res.json(response);
        });
    }

    function addPayment(req, res){
        var orgId = req.params.orgId;
        var paymentId = req.params.paymentId;

        OrganizerModel.addPayment(orgId, paymentId).then(function(response){
            res.json(response);
        });
    }

    function removePayment(req, res){
        var orgId = req.params.orgId;
        var paymentId = req.params.paymentId;

        OrganizerModel.removePayment(orgId, paymentId).then(function(response){
            res.json(response);
        });
    }

    function deleteAll(req, res) {

        OrganizerModel.removeAll().then(function(response) {
            res.json(response);
        });
    }




}