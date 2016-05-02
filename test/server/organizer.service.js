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
    //});
});
describe('Organizer REST API', function(){

    var org = {
        "name": "Starbucks",
        "email": "sb@gmail.com",
        "password": "sb",
        "createdEventIds": ["123", "111"],
        "paymentIds": []
    }

    describe('Create Organizer', function(){

        it('should return organizer object with the same data that was sent'
            , function(done){

                request(url)
                    .post("/api/org")
                    .send(org)
                    .expect(200)
                    .end(function(err, res){
                        res.body.email.should.equal(org.email);
                        org._id = res.body._id;

                        done();

                    });
            }
        );
        it('should return null if email already exists'
            , function(done){

                request(url)
                    .post("/api/org")
                    .send(org)
                    .expect(200)
                    .end(function(err, res){
                        (res.body==null).should.be.true;

                        done();
                    });
            }
        );


    });

    describe('Update Organizer', function(){
        it('should return null if organizer does not exist'
            , function(done){
                var orgId = "111111111111";

                request(url)
                    .get("/api/org/" + orgId)
                    .expect(200)
                    .end(function(err, res){
                        (res.body==null).should.be.true;
                        done();
                    });
            }
        );
        it('should return organizer with updated properties', function(done){
                org.email = "sb@yahoo.com";

                request(url)
                    .put("/api/org/" + org._id)
                    .send(org)
                    .expect(200)
                    .end(function(err, res){
                        res.body.nModified.should.equal(1);

                        done();
                    });
            }
        );
    });

    describe('Find Organizer', function(){
        it('should return null if organizer was not found'
            , function(done){
                var orgId = "111111111111";

                request(url)
                    .get("/api/org/" + orgId)
                    .expect(200)
                    .end(function(err, res){
                        (res.body==null).should.be.true;
                        done();
                    });
            }
        );
        it('should return organizer object if orgId is matched'
            , function(done){

                request(url)
                    .get("/api/org/" + org._id)
                    .expect(200)
                    .end(function(err, res){
                        res.body._id.should.equal(org._id);

                        done();
                    });
            }
        );
        it('should return all organizers if no orgId is provided'
            , function(done){

                request(url)
                    .get("/api/org")
                    .expect(200)
                    .end(function(err, res){

                        (res.body).should.be.a.Array;
                        done();
                    });
            }
        );
        it('should return organizer object if credentials are matched', function(done){
                var email = "sb@yahoo.com";
                request(url)

                    .get("/api/org?email=" + email + "&password=" + org.password)
                    .expect(200)
                    .end(function(err, res){
                        res.body[0].email.should.equal(email);
                        done();
                    });
            }
        );

    });

    describe('Delete Organizer', function(){
        it('should return the same amount of organizers as before if the orgId was not found' , function(done){
                var orgId = "1212912989";
                request(url)
                    .get("/api/org")
                    .expect(200)
                    .end(function(err, res){
                        var orgSize = res.body.length;

                        request(url)
                            .delete("/api/org/" + orgId)
                            .end(function(err, res){

                                request(url)
                                    .get("/api/org")
                                    .expect(200)
                                    .end(function(err, res){
                                        res.body.length.should.equal(orgSize);
                                        done();
                                    });
                            });
                    });
            }
        );
        it('organizer count should now be one less than it was before', function(done){
            request(url)
                .get("/api/org")
                .expect(200)
                .end(function(err, res){
                    var orgSize = res.body.length;

                    request(url)
                        .delete("/api/org/" + org._id)
                        .end(function(err, res){
                            request(url)
                                .get("/api/org")
                                .expect(200)
                                .end(function(err, res){
                                    res.body.length.should.equal(orgSize-1);
                                    request(url)
                                        .delete("/api/org/delete")
                                        .end(function(err, res){
                                            done();
                                        });
                                });
                        });
                });


        });


    });

});