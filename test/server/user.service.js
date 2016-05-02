var should = require('should');
var assert = require('assert');
var request = require('supertest');

var server = require('../../testServer.js');

var url = "localhost:3000"; // local
var app;
//var url = "http://nodejs-instaevents.rhcloud.com"; //remote
describe('server', function () {
    //before(function (done) {
    //    server.start();
    //    done();
    //});
    //
    //after(function (done) {
    //    server.stop();
    //    done();
    //});
});
describe('User REST API', function(){

    var user = {
        "name": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "jdoe@gmail.com",
        "password": "jdoe",
        "location": {
            "lat": "123",
            "lng": "123"
        },
        "attendingEventIds": [],
        "paymentIds": [],
        "preferences": []
    }

    describe('Create User', function(){

        it('should return user object with the same data that was sent', function(done){
                request(url)
                    .post("/api/user")
                    .send(user)
                    .expect(200)
                    .end(function(err, response){
                        response.body.email.should.equal(user.email);
                        user._id = response.body._id;


                        //(1==1).should.be.true;
                        done();


                    });
            }
        );
        it('should return null if email already exists', function(done){

                request(url)
                    .post("/api/user")
                    .send(user)
                    .expect(200)
                    .end(function(err, res){
                        (res.body==null).should.be.true;
                        done();
                    });
            }
        );


    });

    describe('Update User', function(){
        it('should return null if user does not exist'
            , function(done){
                var userId = "111111111111";

                request(url)
                    .get("/api/user/" + userId)
                    .expect(200)
                    .end(function(err, res){
                        (res.body==null).should.be.true;
                        done();
                    });
            }
        );
        it('should return user with updated properties', function(done){
                user.email = "jdoe@yahoo.com";

                request(url)
                    .put("/api/user/" + user._id)
                    .send(user)
                    .expect(200)
                    .end(function(err, res){
                        res.body.nModified.should.equal(1);

                        //request(url)
                        //    .delete("/api/user")
                        //    .expect(200)
                        //    .end(function(err, response){
                        //        done();
                        //    });
                        done();
                    });
            }
        );
    });

    describe('Find User', function(){
        it('should return null if user was not found'
            , function(done){
                var userId = "111111111111";

                request(url)
                    .get("/api/user/" + userId)
                    .expect(200)
                    .end(function(err, res){
                        (res.body==null).should.be.true;
                        done();
                    });
            }
        );
        it('should return user object if userID is matched'
            , function(done){

                request(url)
                    .get("/api/user/" + user._id)
                    .expect(200)
                    .end(function(err, res){
                        res.body._id.should.equal(user._id);

                        done();
                    });
            }
        );
        it('should return all users if no userID is provided'
            , function(done){

                request(url)
                    .get("/api/user")
                    .expect(200)
                    .end(function(err, res){

                        (res.body).should.be.a.Array;
                        done();
                    });
            }
        );
        it('should return user object if credentials are matched', function(done){
                var email = "jdoe@yahoo.com";
                request(url)

                    .get("/api/user?email=" + email + "&password=" + user.password)
                    .expect(200)
                    .end(function(err, res){
                        res.body[0].email.should.equal(email);
                        done();
                    });
            }
        );

    });

    describe('Delete User', function(){
        it('should return the same amount of users as before if the userID was not found' , function(done){
                var userId = "1212912989";
                request(url)
                    .get("/api/user")
                    .expect(200)
                    .end(function(err, res){
                        var userSize = res.body.length;

                        request(url)
                            .delete("/api/user/" + userId)
                            .end(function(err, res){

                                request(url)
                                    .get("/api/user")
                                    .expect(200)
                                    .end(function(err, res){
                                        res.body.length.should.equal(userSize);
                                        done();
                                    });
                            });
                    });
            }
        );
        it('user count should now be one less than it was before', function(done){
            request(url)
                .get("/api/user")
                .expect(200)
                .end(function(err, res){
                    var userSize = res.body.length;

                    request(url)
                        .delete("/api/user/" + user._id)
                        .end(function(err, res){
                            request(url)
                                .get("/api/user")
                                .expect(200)
                                .end(function(err, res){
                                    res.body.length.should.equal(userSize-1);
                                    request(url)
                                        .delete("/api/user")
                                        .end(function(err, res){
                                            done();
                                        });
                                });
                        });
                });


        });


    });

});