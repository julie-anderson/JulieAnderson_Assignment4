var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/user');
var ctrlIndex = require('../controllers/index');

/* GET home page. */
router.get('/', ctrlIndex.userList);

/* API */
router.get('/api/users/', ctrlUsers.findAll);
router.get('/api/users/:id/notes', ctrlUsers.findNotesById);
router.get('/api/users/:id/notes/:title', ctrlUsers.findNotesByIdAndTitle);
//router.get('/api/users/:id', ctrlUsers.findById);
router.put('/api/users/', ctrlUsers.add);
router.put('/api/users/:id/notes/:title', ctrlUsers.updateNoteByTitleandId);
router.delete('/api/users/:id/notes/:title', ctrlUsers.deleteNoteByTitleandId);
router.post('/api/users/:id', ctrlUsers.update);
router.post('/api/users/:id/notes', ctrlUsers.addNote);
router.delete('/api/users/:id',ctrlUsers.deleteById);

module.exports = router;
