module.exports = function(mongoose){

    var EventSchema = mongoose.Schema({

        "title": String,
        "description": String,
        "type": { type: String, enum: [ "ART",
                                        "MOVIE", 
                                        "MUSIC", 
                                        "FOOD", 
                                        "SOCIAL",
                                        "OUTDOOR",
                                        "CHARITY",
                                        "LECTURE"]},
        "creatorId": String,
        "Date": Date,
        "Time": Date,
        "price": Number,
        "seats": Number,
        "seatsavailable": Number,
        "creationFeePaid": {type: Boolean, default: false},
           "eventLocation": {
                "lat": String,
                "long": String,
                "address": String
            },
        "reviews": [{
            "rating": Number,
            "reviewContent": String
        }],
        "averageRating": Number,
        "crtnDt": Date,
        "mdfdDt": Date

    }, {collection: "instaevents.events"});

    return EventSchema;
}