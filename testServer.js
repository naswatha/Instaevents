var express = require('express');
var parser = require('body-parser');
var mongoose = require('mongoose');


var dbName = 'testInstaevents';
var connectString = 'mongodb://localhost/' + dbName;
module.exports = function(){

    var calls = {
        start: start,
        stop: stop
    }


    if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        urlToConnect = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    var db = mongoose.connect(connectString);

    var app = express();

    var server;

    app.use(express.static(__dirname + '/public/project'));
    app.use(parser.json()); // for parsing application/json
    app.use(parser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(parser());

    var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
    var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

    require("./public/project/server/app.js")(app, mongoose, db);

//require("./public/project/server/models/user.model.js")(mongoose,db);

    app.get("/",function(req,res){
        res.sendfile(__dirname+"/public/index.html");
    });


    function start(){
         server = app.listen(port,ipaddress);
    }

    function stop(){
        console.log("Server is closing...");
        mongoose.conection.close();
        server.close(function(){
            console.log("closing");
        });
    }

    return calls;

}


