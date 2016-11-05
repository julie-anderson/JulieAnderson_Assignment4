/**
 * Created by julieanderson on 11/5/16.
 */


var request = require('request');

var renderHomepage = function(req, res, responseBody){
    res.render('index', {
        title: "Notes",
        notes: responseBody
    });
};

module.exports.noteList = function(req, res) {
    var options = {
        url: 'http://localhost:3000/api/notes',
        methog: 'GET',
        json: {}
    }

    request(options, function(err,response,body){
        if(err){
            console.log(err);
            res.render('error', {
                message: 'Error',
                error: err
            });
        } else if (response.statusCode ===200){
            renderHomepage(req, res, body);
        } else {
            console.log(response.statusCode);
        }
    });
};