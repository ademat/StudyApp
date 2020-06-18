const express = require('express');

const {
  getAllDecks, getDeck, createDeck, updateDeck, deleteDeck,
} = require('../controllers/decks');

// Include other resource routers
const vocabularyRouter = require('./vocabulary');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:deckId/vocabulary', vocabularyRouter);

router.route('/:userId').get(protect, getAllDecks).post(protect, createDeck);
router.route('/:userId/:id').get(protect, getDeck).put(protect, updateDeck)
  .delete(protect, deleteDeck);

module.exports = router;
