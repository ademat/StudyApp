const express = require('express');

// mergeParams - merging parameters from deck and vocabulary routes
const router = express.Router({ mergeParams: true });
const {
  getVocabulary,
} = require('../controllers/vocabulary');

router.route('/').get(getVocabulary);

module.exports = router;
