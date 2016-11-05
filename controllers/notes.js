/**
 * Created by julieanderson on 11/5/16.
 */

 var Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    ObjectId = require('mongodb').ObjectId;

 var server = new Server('localhost', 27017, {auto_reconnect: true});
 db = new Db('test', server);

 db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'test' database");
        db.collection('notes', {strict:true}, function(err,collection){
            if(err){
                console.log("The 'notes' collection doesn't exist.");
            }
        });
     }
 });

 exports.findById = function(req, res) {
 var id = req.params.id;
 console.log("Finding Note " + id);
 }

 exports.findAll = function(req, res) {
  console.log("Finding All Notes");
  db.collection('notes', function(err,collection) {
    collection.find().toArray(function(err, items) {
        res.status(200);
        res.send(items);
    });
  });
  };

 exports.add = function(req, res) {
   console.log("Adding Note");
   }

 exports.update = function(req, res) {
   var id = req.params.id;
    console.log("Updating Note " + id);
   }

  exports.deleteById = function(req, res) {
    var id = req.params.id;
     console.log("Deleting Note " + id);
    }

