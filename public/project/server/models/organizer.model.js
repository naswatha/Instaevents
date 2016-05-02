var q = require("q");
module.exports = function(mongoose,db){

    var OrganizerSchema = require("./organizer.schema.js")(mongoose);
    var OrganizerModel  = mongoose.model("OrganizerModel", OrganizerSchema);

    var api = {
        createOrganizer: createOrganizer,
        updateOrganizer: updateOrganizer,
        removeOrganizer: removeOrganizer,
        getOrganizerByEmail: getOrganizerByEmail,
        getOrganizerById: getOrganizerById,
        getOrganizerByName: getOrganizerByName,
        getAllOrganizers: getAllOrganizers,

        addEvent: addEvent,
        removeEvent: removeEvent,
        getCreatedEventIds: getCreatedEventIds,

        addPayment: addPayment,
        removePayment: removePayment,
        getPaymentIds: getPaymentIds,

        removeAll: removeAll

    }

    return api;

    function getPaymentIds(id){
        var deferred = q.defer();

        OrganizerModel.findById(id, function(err, org){
            deferred.resolve(org.paymentIds);
        });

        return deferred.promise;

    }

    function getCreatedEventIds(id){
        var deferred = q.defer();

        OrganizerModel.findById(id, function(err, org){
            deferred.resolve(org.createdEventIds);
        });

        return deferred.promise;

    }

    function getAllOrganizers(){
        var deferred = q.defer();

        OrganizerModel.find(function(err, orgs){
            deferred.resolve(orgs);
        });

        return deferred.promise;
    }

    function createOrganizer(org) {

        var deferred = q.defer();

        OrganizerModel.findOne({email: org.email}, function(err, found){
            if(found)
                deferred.resolve(null);
            else
                OrganizerModel.create(org, function(err, created){
                    console.log(created);
                    deferred.resolve(created);
                });
        });

        return deferred.promise;
    }

    function updateOrganizer(orgId, org){

        var deferred = q.defer();

        OrganizerModel.update({_id: orgId}, org, function(err, updatedOrg){
            deferred.resolve(updatedOrg);
        });

        return deferred.promise;
    }

    function removeOrganizer(orgId){
        var deferred = q.defer();

        OrganizerModel.remove({_id: orgId}, function(err, res){
            deferred.resolve(res);
        });

        return deferred.promise;
    }

    function getOrganizerByEmail(email){

        var deferred = q.defer();

        OrganizerModel.find({email: email}, function(err, found){
            deferred.resolve(found);
        });
        return deferred.promise;
    }

    function getOrganizerById(id){
        var deferred = q.defer();

        OrganizerModel.findById(id, function(err, found){
            deferred.resolve(found);
        });

        return deferred.promise;
    }

    function getOrganizerByName(name){

        var deferred = q.defer();

        OrganizerModel.find({name: name}, function(err, found){
            deferred.resolve(found);
        });

        return deferred.promise;
    }

    function addEvent(orgId, eventId){

        var deferred = q.defer();


        OrganizerModel.findById(orgId, function(err, found){
            found.createdEventIds.push(eventId);

            found.save(function(err, res){
                deferred.resolve(res);
            });
        });
        return deferred.promise;

    }

    function removeEvent(orgId, eventId){

        var deferred = q.defer();

        OrganizerModel.findById(orgId, function(err, org){

            for(var i = 0; i < org.createdEventIds.length; i++){
                if(org.createdEventIds[i] == eventId){
                    org.createdEventIds.splice(i, 1);
                    org.save(function(err, res){
                        deferred.resolve(res);
                    });
                }
            }
        });

        return deferred.promise;

    }

    function addPayment(orgId, paymentId){

        var deferred = q.defer();


        OrganizerModel.findById(orgId, function(err, found){
            found.paymentIds.push(paymentId);

            found.save(function(err, res){
                deferred.resolve(res);
            });
        });
        return deferred.promise;

    }

    function removePayment(orgId, paymentId){
        var deferred = q.defer();

        OrganizerModel.findById(orgId, function(err, org){

            for(var i = 0; i < org.paymentIds.length; i++){
                if(org.paymentIds[i] == paymentId){
                    org.paymentIds.splice(i, 1);
                    org.save(function(err, res){
                        deferred.resolve(res);
                    });
                }
            }
        });

        return deferred.promise;
    }

    function removeAll(){

        var deferred = q.defer();

        OrganizerModel.remove({}, function(err, response){
            deferred.resolve(response);
        });

        return deferred.promise;
    }



}