const express = require('express');

// mergeParams - merging parameters from deck and vocabulary routes
const router = express.Router({ mergeParams: true });
const {
  getVocabulary,
  getSingleVocabulary,
  addVocabulary,
  updateVocabulary,
  deleteVocabulary,
} = require('../controllers/vocabulary');

router.route('/').get(getVocabulary).post(addVocabulary);
router.route('/:id').get(getSingleVocabulary).put(updateVocabulary).delete(deleteVocabulary);

module.exports = router;
