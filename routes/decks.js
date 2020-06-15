const express = require('express');

const {
  getAllDecks, getDeck, createDeck, updateDeck, deleteDeck,
} = require('../controllers/decks');

// Include other resource routers
const vocabularyRouter = require('./vocabulary');

const router = express.Router();

// Re-route into other resource routers
router.use('/:deckId/vocabulary', vocabularyRouter);

router.route('/').get(getAllDecks).post(createDeck);
router.route('/:id').get(getDeck).put(updateDeck)
  .delete(deleteDeck);

module.exports = router;
