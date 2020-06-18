const ErrorResponse = require('../utils/errorResponse');
const Deck = require('../models/Deck');
const Vocabulary = require('../models/Vocabulary');

// @desc    Get all available decks
// @url     GET /api/v1/decks
// @access  private
exports.getAllDecks = async (req, res, next) => {
  try {
    const all_decks = await Deck.find();

    all_decks.forEach((deck) => {
      Vocabulary.getVocabCount(deck._id);
    });

    let query;

    // copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude from filtering
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach((param) => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // create operators ($gt, $gte...)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

    // finding documents
    query = Deck.find(JSON.parse(queryStr)).populate('vocabulary');

    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort by parameters, default by Deck name
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('name');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Deck.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const decks = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({ succes: true, pagination, data: decks });
  } catch (err) {
    next(err);
  }
};

// @desc    Get a deck
// @url     GET /api/v1/decks/:id
// @access  private
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

// @desc    Create a deck
// @url     POST /api/v1/decks/:id
// @access  private
exports.createDeck = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const deck = await Deck.create(req.body);

    res.json({ succes: true, data: deck });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a deck
// @url     PUT /api/v1/decks/:id
// @access  private
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

// @desc    Delete a deck
// @url     DELETE /api/v1/decks/:id
// @access  private
exports.deleteDeck = async (req, res, next) => {
  try {
    const deck = await Deck.findById(req.params.id);

    if (!deck) {
      return next(new ErrorResponse(`Deck not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is deck owner
    if (deck.user.toString() !== req.user.id) {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this bootcamp`, 401));
    }

    deck.remove();

    res.status(200).json({ succes: true, data: {} });
  } catch (err) {
    next(err);
  }
};
