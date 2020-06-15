const ErrorResponse = require('../utils/errorResponse');
const Deck = require('../models/Deck');

// @desc Get all available decks
// @url GET api/v1/decks
// @access private
exports.getAllDecks = async (req, res, next) => {
  try {
    const decks = await Deck.find();
    res.status(200).json({ succes: true, data: decks });
  } catch (err) {
    next(err);
  }
};

// @desc Get a deck
// @url GET api/v1/decks/:id
// @access private
exports.getDeck = async (req, res, next) => {
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return next(new ErrorResponse(`Deck not found with id of ${req.params.id}`, 404));
    }
    res.json({ succes: true, data: deck });
  } catch (err) {
    next(err);
  }
};

// @desc Create a deck
// @url POST api/v1/decks/:id
// @access private
exports.createDeck = async (req, res, next) => {
  try {
    const deck = await Deck.create(req.body);
    res.json({ succes: true, data: deck });
  } catch (err) {
    next(err);
  }
};

// @desc Update a deck
// @url PUT api/v1/decks/:id
// @access private
exports.updateDeck = async (req, res, next) => {
  try {
    const deck = await Deck.findByIdAndUpdate(req.params.id, req.body);
    if (!deck) {
      return next(new ErrorResponse(`Deck not found with id of ${req.params.id}`, 404));
    }
    res.json({ succes: true, data: deck });
  } catch (err) {
    next(err);
  }
};

// @desc Delete a deck
// @url DELETE api/v1/decks/:id
// @access private
exports.deleteDeck = async (req, res, next) => {
  try {
    const deck = await Deck.findByIdAndDelete(req.params.id);
    if (!deck) {
      return next(new ErrorResponse(`Deck not found with id of ${req.params.id}`, 404));
    }
    res.json({ succes: true, data: deck });
  } catch (err) {
    next(err);
  }
};
