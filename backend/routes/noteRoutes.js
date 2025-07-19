const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getNotes, createNote, deleteNote } = require('../controllers/noteController');

router.route('/').get(auth, getNotes).post(auth, createNote);
router.route('/:id').delete(auth, deleteNote);

module.exports = router;