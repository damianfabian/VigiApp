var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

userReport = function(host, port) {
  this.db= new Db('VigiApp', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};

//save new report
userReport.prototype.save = function(db) {
    return function(req, res) {
    	console.log("LOG2::: %j",req.body);
        // Get our form values. These rely on the "name" attributes
        var shortDescription = req.body.shortDescription;
        var reportDescription = req.body.reportDescription;
        var latitud = req.body.latitude;
        var longitud = req.body.longitude;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert(
	        {
	            "shortDescription" : shortDescription,
	            "reportDescription" : reportDescription,
	            "longitud" : longitud,
	            "latitud" : latitud
	        }, 
        	function (err, doc) {
	            if (err) {
	                // If it failed, return error
	                res.send("There was a problem adding the information to the database.");
	            }
	            else {
	                // If it worked, set the header so the address bar doesn't still say /adduser
	                res.send("true");
	            }
        	}
    	);

    }
};

exports.userReport = userReport;