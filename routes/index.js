var express = require('express');
var router = express.Router();
var ctrlNotes = require('../controllers/notes');
var ctrlIndex = require('../controllers/index');

/* GET home page. */
router.get('/', ctrlIndex.noteList);

/* API */
router.get('/api/notes', ctrlNotes.findAll);
router.get('/api/notes/:id', ctrlNotes.findById);
router.put('/api/notes/', ctrlNotes.add);
router.post('/api/notes/:id', ctrlNotes.update);
router.delete('/api/notes/:id',ctrlNotes.deleteById);

module.exports = router;
