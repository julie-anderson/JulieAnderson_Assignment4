/**
 * Created by julieanderson on 11/5/16.
 */

 exports.findById = function(req, res) {
 var id = req.params.id;
 console.log("Finding Note " + id);
 }

 exports.findAll = function(req, res) {
  console.log("Finding All Notes");
  }

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

