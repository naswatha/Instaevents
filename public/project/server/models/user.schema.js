module.exports = function(mongoose){

    var PrefSchema = require("./preference.schema.js")(mongoose);

    var UserSchema =  mongoose.Schema({

        "name": {
            "firstName": String,
            "lastName": String
        },
        "email": String,
        "password": String,
        "location": {
            "lat": String,
            "lng": String
        },
        "attendingEventIds": [String],
        "paymentIds": [String],
        "preferences": [PrefSchema],
        "crtnDt": Date,
        "mdfdDt": Date
    }, {collection: "instaevents.users"});

    return UserSchema;
}