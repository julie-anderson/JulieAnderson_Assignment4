/**
 * Created by julieanderson on 11/5/16.
 */

 var Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    ObjectId = require('mongodb').ObjectId;

 var server = new Server('localhost', 27017, {auto_reconnect: true});
 db = new Db('test', server);

 db.open(function(err, db) {
    //db.dropDatabase();
    if(!err) {
        console.log("Connected to 'test' database");
        //populateDB();
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
        collection.findOne({'_id': id},function(err, item) {
            res.status(200);
            res.send(item.notes);
        });
    });
 }

exports.findNotesByUsername = function(req, res) {
    var username = req.params.username;
    console.log("Finding Notes for User " + username );
    db.collection('users', function(err, collection) {
        collection.findOne({'username': username},function(err, item) {
            res.status(200);
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
            res.status(200);
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
    console.log(req.body.title);
    console.log("Adding Note for user " + id);
    db.collection('users', function (err, collection) {
        collection.update({'_id': id}, {$push: {notes: req.body}}, {w:1}, function(err,item){
            console.log("Added.")
            res.status(200);
            res.redirect('/');

        })
    })
};

 exports.update = function(req, res) {
   var id = req.params.id;
    console.log("Updating User " + id);
   }

exports.updateNoteByTitleandId = function(req,res) {
    var id = req.params.id;
    var title = req.params.title;
    console.log('Updating note named ' + title + ' from user ' + id);
    db.collection('users', function(err,collection){
        collection.update({'_id': id, "notes.title": title}, {$set: {"notes.$.contents": req.body.contents}},function(err,item) {
            console.log("Updated.");
            res.status(200);
            res.redirect('/');
        })

    })
};

exports.deleteNoteByTitleandId = function(req,res) {
    var id = req.params.id;
    var title = req.params.title;
    console.log('Deleting note named ' + title + ' from user ' + id);
    db.collection('users', function(err,collection){
        collection.update({'_id': id}, {$pull: {"notes" : {"title":title}}},function(err,item) {
            console.log("Deleted.");
            res.status(200);
            res.redirect('/');
        })

    })
};

  exports.deleteById = function(req, res) {
      var id = req.params.id;
      console.log('Deleting user with id ' + id);
      db.collection('users', function(err, collection) {
          console.log('deleting');
          collection.remove({'_id': id}, function(err, results) {
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
             _id: "1",
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

