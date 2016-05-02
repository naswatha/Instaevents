module.exports = function(mongoose){

    var PrefSchema = mongoose.Schema({
        "name": String,
        "range": Number,
        "cost": Number,
        "eventType": { type: String,
            enum: ["ART",
                "MOVIE",
                "MUSIC",
                "FOOD",
                "SOCIAL",
                "OUTDOOR",
                "CHARITY",
                "LECTURE"]
        }});

    return PrefSchema;
}
