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

 exports.findNotesById = function(req, res) {
    var id = req.params.id;
    console.log("Finding Notes for User " + id );
    db.collection('users', function(err, collection) {
        collection.findOne({'_id': new ObjectId(id)},function(err, item) {
            res.send(item.notes);
        });
    });
 }

exports.findNotesByIdAndTitle = function(req, res) {
    var id = req.params.id;
    var title = req.params.title;
    console.log("Finding Notes named " + title + " for User " + id );
    db.collection('users', function(err, collection) {
        collection.findOne({'_id': new ObjectId(id)},function(err, item) {
            var noteToReturn;
            for(var i = 0; i<item.notes.length; i++){
                console.log(item.notes[i].title)
                if (item.notes[i].title == title){noteToReturn = item.notes[i]}
            }
            res.send(noteToReturn);
        });
    });
}

 exports.findAll = function(req, res) {
  console.log("Finding All Notes for a user");
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

exports.addNote = function(req, res) {
    var id = req.params.id;
    console.log("Adding Note for user " + id);
    var newNote = {title: "Third Note", contents: "x y z"};
    db.collection('users', function (err, collection) {
        collection.update({'_id': new ObjectId(id)}, {$push: {notes: newNote}},function(err,item){
            console.log("Added.")
            res.send({'added': newNote});
        })
    })
};

 exports.update = function(req, res) {
   var id = req.params.id;
    console.log("Updating User " + id);
   }

  exports.deleteById = function(req, res) {
      var id = req.params.id;
      console.log('Deleting user with id ' + id);
      db.collection('users', function(err, collection) {
          console.log('deleting');
          collection.remove({'_id': new ObjectId(id)}, function(err, results) {
              if (err){
                  console.log("failed");
                  throw err;
              }
              console.log('deleted');
              res.status(200);
              res.send({'message': 'item deleted id ' + req.params.id});
          });
      });
    }

 var populateDB = function() {

     var user = [
         {
             username: "test",
             password: "test",
             notes: [
                 {
                     title: "groceries",
                     contents: "apples, bananas, oranges"
                 },
                 {
                     title: "Another note",
                     contents: "1,2,3"
                 }
             ]
         }];

     db.collection('users', function(err, collection) {
         collection.insert(user, {safe:true}, function(err, result) {});
     });

 };

