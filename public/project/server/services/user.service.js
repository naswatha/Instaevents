//var model = require("../models/user.model.js")();

module.exports = function(app, UserModel) {

    //user CRUD
    app.post("/api/user", createUser);
    app.get("/api/user/email=:email&password=:password", getUserByCredentials);
    app.get("/api/user/:id", getUserById);
    app.put("/api/user/:id", updateUser);
    app.delete("/api/user/:id", deleteUser);
    app.get("/api/user", getAllUsers);

    //event CRUD
    app.post("/api/user/:userId/event/:eventId", addEvent);
    app.delete("/api/user/:userId/event/:eventId", removeEvent);
    app.get("/api/user/:id/event", getAttendingEventIds);

    //preference CRUD
    app.post("/api/user/:userId/preference", addPreference);
    app.put("/api/user/:userId/preference/:prefId", updatePreference);
    app.delete("/api/user/:userId/preference/:prefId", removePreference);
    app.get("/api/user/:userId/preference/:prefId", getPreferenceById);
    app.get("/api/user/:userId/preference", getAllPreferences);

    //payment CRUD
    app.post("/api/user/:userId/payment/:paymentId", addPayment);
    app.delete("/api/user/:userId/payment/:paymentId", removePayment);
    app.get("/api/user/:id/payment", getPaymentIds);

    app.delete("/api/user", removeAll); //WARNING: THIS WILL CLEAR THE ENTIRE DATABASE


    function getAttendingEventIds(req, res){
        var id = req.params.id;
        UserModel.getAttendingEventIds(id).then(function(events){
            res.json(events);
        });
    }

    function getPaymentIds(req, res){
        var id = req.params.id;
        UserModel.getPaymentIds(id).then(function(payments){
            res.json(payments);
        });
    }

    function getAllUsers(req, res){
        console.log("here see");
        UserModel.getAllUsers().then(function(users){
            res.json(users);
        });
    }

    function getAllPreferences(req, res){
        var userId = req.params.userId;

        UserModel.getAllPreferences(userId).then(function(prefs){
            res.json(prefs);
        });
    }
    function getPreferenceById(req, res){
        var userId = req.params.userId;
        var prefId = req.params.prefId;
        UserModel.getPreferenceById(userId, prefId).then(function(response){
            res.json(response);
        });
    }

    function addPayment(req, res){
        var userId = req.params.userId;
        var paymentId = req.params.paymentId;

        UserModel.addPayment(userId, eventId).then(function(response){
            res.json(response);
        });
    }

    function removePayment(req, res){
        var userId = req.params.userId;
        var paymentId = req.params.paymentId;

        UserModel.removePayment(userId, eventId).then(function(response){
            res.json(response);
        });

    }

    function addPreference(req, res){
        var userId = req.params.userId;
        var preference = req.body;

        UserModel.addPreference(userId, preference).then(function(response){
            res.json(response);
        });
    }

    function updatePreference(req, res){
        var userId = req.params.userId;
        var prefId = req.params.prefId;
        var pref = req.body;

        UserModel.updatePreference(userId, prefId, pref).then(function(response){
            res.json(response);
        });
    }

    function removePreference(req, res){
        var userId = req.params.userId;
        var prefId = req.params.prefId;

        UserModel.removePreference(userId, prefId).then(function(response){
            res.json(response);
        });
    }

    function addEvent(req, res){
        var userId = req.params.userId;
        var eventId = req.params.eventId;

        UserModel.addEvent(userId, eventId).then(function(response){
            res.json(response);
        });

    }

    function removeEvent(req, res){
        var userId = req.params.userId;
        var eventId = req.params.eventId;

        UserModel.removeEvent(userId, eventId).then(function(response){
            res.json(response);
        });
    }

    function createUser(req, res){
        var user = req.body;
        UserModel.create(user).then(function(response){
            res.json(response);
        });
    }


    function getUserByCredentials(req, res){
        console.log("in user query");
        var creds = {email: req.params.email, password: req.params.password};
        UserModel.findUserByCredentials(creds).then(function(response){
            res.json(response);
        });
    }


    function getUserById(req, res){
        var id = req.params.id;

        UserModel.findById(id).then(function(user){
            res.json(user);
        });
    }

    function updateUser(req, res){
        var id = req.params.id;
        var user = req.body;

        UserModel.updateUser(id, user).then(function(response){
            res.json(response);
        });
    }

    function deleteUser(req, res){
        var id = req.params.id;

        UserModel.removeUser(id).then(function(users){
            res.json(users);
        });
    }

    function removeAll(req, res){

        UserModel.removeAll().then(function(response){
            res.json(response);
        });
    }


}