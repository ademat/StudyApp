const express = require('express');

const router = express.Router();
const {
  getAllDecks, getDeck, createDeck, updateDeck, deleteDeck,
} = require('../controllers/decks');

router.route('/').get(getAllDecks).post(createDeck);
router.route('/:id').get(getDeck).put(updateDeck)
  .delete(deleteDeck);

module.exports = router;
