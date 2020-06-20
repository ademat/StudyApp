const express = require('express');

// mergeParams - merging parameters from deck and vocabulary routes
const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

const {
  getVocabulary,
  getSingleVocabulary,
  addVocabulary,
  updateVocabulary,
  deleteVocabulary,
} = require('../controllers/vocabulary');

router.route('/').get(protect, getVocabulary).post(protect, addVocabulary);
router.route('/:id').get(protect, getSingleVocabulary).put(protect, updateVocabulary).delete(protect, deleteVocabulary);

module.exports = router;
