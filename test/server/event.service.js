var should = require('should');
var assert = require('assert');
var request = require('supertest');
var server = require('../../testServer.js');

var url = "localhost:3000"; // local

var app;

describe('server', function () {

});


describe('Event REST API', function(){

var event = {

        "title": "Foo Fighters Concert",
        "description": "First ever visit to Boston",
        "type": "MUSIC",
        "creatorId": "122343423423",
        "price": 50,
        "seats": 200,
        "seatsavailable": 150,
        "creationFeePaid": true,
           "eventLocation": {
                "lat": "12334.34343",
                "long": "345435.45345",
                "address": "360 Huntington Avenue Boston MA,USA"
            },
        "reviews": [
        			{"rating": 4,
        			 "reviewContent": "good concert"},
        			{"rating": 5,
        			 "reviewContent": "Amazing"
        			}
        		   ],
        "averageRating": 4.5,
    }




    describe('Create Event', function(){

        it('should return event object with the same data that was sent', function(done){
                request(url)
                    .post("/api/event/organizer/:organizerId")
                    .send(event)
                    .expect(200)
                    .end(function(err, response){
                        event._id = response.body._id;
                        done();


                    });
            }
        );
        it('should return null if event already exists', function(done){

                request(url)
                    .post("/api/event/organizer/:organizerId")
                    .send(event)
                    .expect(200)
                    .end(function(err, res){
                        (res.body==null).should.be.true;
                        done();
                    });
            }
        );


    });


        describe('Update event', function(){
        it('should return null if event does not exist'
            , function(done){
                var eventId = "349587438579348";

                request(url)
                    .get("/api/event/" + eventId)
                    .expect(200)
                    .end(function(err, res){
                        (res.body==null).should.be.true;
                        done();
                    });
            }
        );
        it('should return events with updated properties', function(done){
                event.title = "updated name to the old event";

                request(url)
                    .put("/api/event/" + event._id)
                    .send(event)
                    .expect(200)
                    .end(function(err, res){
                        res.body.nModified.should.equal(1);
                        done();
                    });
            }
        );
    });


    describe('Find events', function(){
        it('should return null if event was not found'
            , function(done){
                var eventId = "923574857943582435435";

                request(url)
                    .get("/api/event/" + eventId)
                    .expect(200)
                    .end(function(err, res){
                        (res.body==null).should.be.true;
                        done();
                    });
            }
        );
        it('should return event object if eventId is matched'
            , function(done){

                request(url)
                    .get("/api/event/" + event._id)
                    .expect(200)
                    .end(function(err, res){
                        res.body._id.should.equal(event._id);

                        done();
                    });
            }
        );
        it('should return all events if no eventId is provided'
            , function(done){

                request(url)
                    .get("/api/event")
                    .expect(200)
                    .end(function(err, res){

                        (res.body).should.be.a.Array;
                        done();
                    });
            }
        );
        it('should return event object if credentials are matched', function(done){
                //var avgRat = 4.5;
                var price = 50;
                var type = "MUSIC";
                var title = "Foo Fighters Concert";
                request(url)

                    .get("/api/event?price=" + price + "&type=" + type)
                    .expect(200)
                    .end(function(err, res){
                        res.body[0].title.should.equal(title);
                        done();
                    });
            }
        );

    });


    describe('Delete event', function(){
        it('should return the same amount of events as before if the eventId was not found' , function(done){
                var eventId = "9432758437543";
                request(url)
                    .get("/api/event")
                    .expect(200)
                    .end(function(err, res){
                        var eventsize = res.body.length;

                        request(url)
                            .delete("/api/event/" + eventId)
                            .end(function(err, res){

                                request(url)
                                    .get("/api/event")
                                    .expect(200)
                                    .end(function(err, res){
                                        res.body.length.should.equal(eventsize);
                                        done();
                                    });
                            });
                    });
            }
        );
        it('event count should now be one less than it was before', function(done){
            request(url)
                .get("/api/event")
                .expect(200)
                .end(function(err, res){
                    var eventsize = res.body.length;

                    request(url)
                        .delete("/api/event/" + event._id)
                        .end(function(err, res){
                            request(url)
                                .get("/api/event")
                                .expect(200)
                                .end(function(err, res){
                                    res.body.length.should.equal(eventsize-1);
                                    request(url)
                                        .delete("/api/event")
                                        .end(function(err, res){
                                            done();
                                        });
                                });
                        });
                });


        });


    });






});



