const express = require('express');

const router = express.Router();
const {
  getAllDecks, getDeck, createDeck, updateDeck, deleteDeck,
} = require('../controllers/decks');

router.route('/').get(getAllDecks);
router.route('/:id').get(getDeck).post(createDeck).put(updateDeck)
  .delete(deleteDeck);

module.exports = router;
