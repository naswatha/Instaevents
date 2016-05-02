module.exports = function(mongoose){

    var OrganizerSchema = mongoose.Schema({

        "name": String,
        "email": String,
        "password": String,
        "createdEventIds": [String],
        "paymentIds": [String],
        "crtnDt": {type: Date, default: Date.now},
        "mdfdDt":{type: Date, default: Date.now}


    }, {collection: "instaevents.organizers"});

    return OrganizerSchema;
}
