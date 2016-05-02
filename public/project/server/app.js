module.exports = function (app, mongoose, db){

    var UserModel = require("./models/user.model.js")(mongoose, db);
    var OrganizerModel = require("./models/organizer.model.js")(mongoose, db);
    require("./services/user.service.js")(app, UserModel);
    require("./services/organizer.service.js")(app, OrganizerModel);
    var EventModel = require("./models/event.model.js")(mongoose, db, OrganizerModel, UserModel);
    require("./services/event.service.js")(app, EventModel);
}

