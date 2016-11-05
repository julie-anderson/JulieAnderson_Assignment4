var express = require('express');
var router = express.Router();
var ctrlNotes = require('../controllers/notes');
var ctrlIndex = require('../controllers/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
