var q = require("q");
module.exports = function(mongoose,db){

        var UserSchema = require("./user.schema.js")(mongoose);
        var UserModel  = mongoose.model("UserModel", UserSchema);
        var api = {
            create: create,
            updateUser: updateUser,
            removeUser: removeUser,
            addEvent: addEvent,
            removeEvent: removeEvent,
            findUserByCredentials: findUserByCredentials,
            findById: findById,
            getAllUsers: getAllUsers,
            addPreference: addPreference,
            updatePreference: updatePreference,
            removePreference: removePreference,
            getPreferenceById: getPreferenceById,
            getAllPreferences: getAllPreferences,
            getPaymentIds: getPaymentIds,
            getAttendingEventIds: getAttendingEventIds,
            addPayment: addPayment,
            removePayment: removePayment,
            removeAll: removeAll
    }

    return api;

        function getPaymentIds(id){
            var deferred = q.defer();

            UserModel.findById(id, function(err, user){
                deferred.resolve(user.paymentIds);
            });

            return deferred.promise;

        }

        function getAttendingEventIds(id){
            var deferred = q.defer();

            UserModel.findById(id, function(err, user){
                deferred.resolve(user.attendingEventIds);
            });

            return deferred.promise;

        }

        function findById(id){
            var deferred = q.defer();

            UserModel.findById(id, function(err, user){
                deferred.resolve(user);
            });

            return deferred.promise;

        }
        function getAllUsers(){
            var deferred = q.defer();

            UserModel.find(function(err, users){
                deferred.resolve(users);
            });

            return deferred.promise;
        }

        function getAllPreferences(userId){
            var deferred = q.defer();

            UserModel.findById(userId, function(err, user){
                deferred.resolve(user.preferences);
            });

            return deferred.promise;
        }

        function getPreferenceById(userId, prefId){
            var deferred = q.defer();

            UserModel.findById(userId, function(err, user){
                var prefs = user.preferences;

                for(var i = 0; i < prefs.length; i++){
                    if(prefs[i]._id == prefId){
                        deferred.resolve(prefs[i]);
                    }
                }
            });

            return deferred.promise;
        }

        function addPayment(userId, paymentId){
            var deferred = q.defer();

            UserModel.findById(userId, function(err, user){
                user.paymentIds.push(paymentId);
                user.save(function(err, res){
                    deferred.resolve(res);
                });
            });

            return deferred.promise;
        }

        function removePayment(userId, paymentId){
            var deferred = q.defer();

            UserModel.findById(userId, function(err, user){

                for(var i = 0; i < user.paymentIds.length; i++){
                    if(user.paymentIds[i]==paymentId){
                        user.paymentIds.splice(i, 1);
                        user.save(function(err, res){
                            deferred.resolve(res);
                        });
                    }
                }
            });

            return deferred.promise;

        }
        function addPreference(userId, preference){
            var deferred = q.defer();

            UserModel.findById(userId, function(err, user){
                user.preferences.push(preference);
                user.save(function(err, res){
                    deferred.resolve(res);
                });
            });

            return deferred.promise;
        }

        function updatePreference(userId, prefId, preference){
            var deferred = q.defer();

            UserModel.findById(userId, function(err, user){
                for(var i = 0; i < user.preferences.length; i++){
                    if(user.preferences[i]._id == prefId){
                        delete preference._id;
                        user.preferences[i] = preference;
                        user.save(function(err, res){
                            deferred.resolve(res);
                        });
                    }
                }
            });

            return deferred.promise;
        }

        function removePreference(userId, prefId){
            var deferred = q.defer();

            UserModel.findById(userId, function(err, user){

                for(var i = 0; i < user.preferences.length; i++){
                    if(user.preferences[i]._id == prefId){
                        user.preferences.splice(i, 1);
                        user.save(function(err, res){
                            deferred.resolve(res);
                        });
                    }
                }
            });

            return deferred.promise;
        }

        function removeUser(id){

            var deferred = q.defer();
            UserModel.remove({_id: id}, function(err, users){
                deferred.resolve(users);
            });

            return deferred.promise;
        }


        function addEvent(userId, eventId){

            var deferred = q.defer();

            UserModel.findById(userId, function(err, user){
                user.attendingEventIds.push(eventId);
                user.save(function(err, res){
                    deferred.resolve(res.attendingEventIds);
                });
            });

            return deferred.promise;
        }

        function updateUser(id, user){
            var deferred = q.defer();

            UserModel.update({_id: id}, user, function(err, updatedUser){
                deferred.resolve(updatedUser);
            });

            return deferred.promise;
        }

        function removeEvent(userId, eventId){

            var deferred = q.defer();

            UserModel.findById(userId, function(err, user){
                for(var i = 0; i < user.attendingEventIds.length; i++ ){
                    if(user.attendingEventIds[i]==eventId){
                        user.attendingEventIds.splice(i, 1);
                        user.save(function(err, res){
                            deferred.resolve(res.attendingEventIds);
                        });
                    }
                }
            });

            return deferred.promise;
        }

        function create(user) {
            var deferred = q.defer();
            UserModel.find({email: user.email}, function(err, found){
                if(found.length!=0){
                    deferred.resolve(null);
                }

                else {
                    UserModel.create(user, function (err, created) {
                        deferred.resolve(created);

                    });
                }
            });

            return deferred.promise;
        }


         function findUserByCredentials(credentials){
            var deferred = q.defer();

            UserModel.find({email: credentials.email, password: credentials.password}, function(err,user){
                if(err) {
                      deferred.reject(err);
                }
                else {
                      deferred.resolve(user);
                }
            })
            return deferred.promise;
        }

        function removeAll(){

            var deferred = q.defer();

            UserModel.remove({}, function(err, response){
                deferred.resolve(response);
            });

            return deferred.promise;
        }

}