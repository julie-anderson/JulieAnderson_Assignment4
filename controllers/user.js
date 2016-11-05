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
        db.collection('users', {strict:true}, function(err,collection){
            if(err){
                console.log("The 'users' collection doesn't exist. Creating it...");
                populateDB();
            }
        });
     }
 });

 exports.findById = function(req, res) {
 var id = req.params.id;
 console.log("Finding User " + id);
 }

 exports.findAll = function(req, res) {
  console.log("Finding All Users");
  db.collection('users', function(err,collection) {
    collection.find().toArray(function(err, items) {
        res.status(200);
        res.send(items);
    });
  });
  };

 exports.add = function(req, res) {
   console.log("Adding User");
   console.log(req.body);
   db.collection('users', function (err, collection){
    collection.insert(req.body, {w:1}, function(err,doc) {
        console.log(doc);
        res.status(200);
        res.send({'inserted': doc});
    });
   });
  };

 exports.update = function(req, res) {
   var id = req.params.id;
    console.log("Updating User " + id);
   }

  exports.deleteById = function(req, res) {
    var id = req.params.id;
     console.log("Deleting User " + id);
    }

 var populateDB = function() {

     var user = [
     {
         username: "test",
         password: "test",
         notes: [{
             title: "groceries",
             contents: "apples, bananas, oranges"
         }]
     }];

     db.collection('users', function(err, collection) {
         collection.insert(user, {safe:true}, function(err, result) {});
     });

 };

