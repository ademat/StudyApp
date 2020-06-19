const ErrorResponse = require('../utils/errorResponse');
const Deck = require('../models/Deck');
const Vocabulary = require('../models/Vocabulary');

// @desc    Get all available decks
// @url     GET /api/v1/decks/:userId/
// @access  private
exports.getAllDecks = async (req, res, next) => {
  try {
    // Make sure user is authorised to access route
    if (req.params.userId !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this route`, 401));
    }

    const all_decks = await Deck.find({ user: req.params.userId }).populate('vocabulary');

    // eslint-disable-next-line no-inner-declarations
    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }

    await asyncForEach(all_decks, async (deck) => {
      await Vocabulary.getVocabCount(deck._id);
    });

    const decks = await Deck.find({ user: req.params.userId }).populate('vocabulary');

    // let query;

    // // copy req.query
    // const reqQuery = { ...req.query };

    // // Fields to exclude from filtering
    // const removeFields = ['select', 'sort', 'page', 'limit'];
    // removeFields.forEach((param) => delete reqQuery[param]);

    // // Create query string
    // let queryStr = JSON.stringify(reqQuery);

    // // create operators ($gt, $gte...)
    // queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

    // // finding documents
    // query = Deck.find(JSON.parse(queryStr)).populate('vocabulary');

    // // Select fields
    // if (req.query.select) {
    //   const fields = req.query.select.split(',').join(' ');
    //   query = query.select(fields);
    // }

    // // Sort by parameters, default by Deck name
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort('name');
    // }

    // // Pagination
    // const page = parseInt(req.query.page, 10) || 1;
    // const limit = parseInt(req.query.limit, 10) || 10;
    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;
    // const total = await Deck.countDocuments();

    // query = query.skip(startIndex).limit(limit);

    // // Executing query
    // const decks = await query;

    // // Pagination result
    // const pagination = {};

    // if (endIndex < total) {
    //   pagination.next = {
    //     page: page + 1,
    //     limit,
    //   };
    // }

    // if (startIndex > 0) {
    //   pagination.prev = {
    //     page: page - 1,
    //     limit,
    //   };
    // }

    res.status(200).json({ succes: true, data: decks });
  } catch (err) {
    next(err);
  }
};

// @desc    Get a deck
// @url     GET /api/v1/decks/:userId/:id
// @access  private
exports.getDeck = async (req, res, next) => {
  try {
    // Make sure user is authorised to access route
    if (req.params.userId !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this route`, 401));
    }

    const deck = await Deck.find({ _id: req.params.id, user: req.params.userId });

    if (deck.length === 0) {
      return next(new ErrorResponse(`Deck not found with id of ${req.params.id}`, 404));
    }
    res.json({ succes: true, data: deck });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a deck
// @url     POST /api/v1/decks/:userId
// @access  private
exports.createDeck = async (req, res, next) => {
  try {
    // Make sure user is authorised to access route
    if (req.params.userId !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this route`, 401));
    }

    // Add user to req.body
    req.body.user = req.params.userId;

    // Look for deck name in database to ensure it is unique
    const deckbyName = await Deck.findOne({ name: req.body.name, user: req.params.userId });

    if (deckbyName) {
      return next(new ErrorResponse(`Deck with name ${req.body.name} already exists`, 400));
    }

    const deck = await Deck.create(req.body);

    res.json({ succes: true, data: deck });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a deck
// @url     PUT /api/v1/decks/:userId/:id
// @access  private
exports.updateDeck = async (req, res, next) => {
  try {
    // Make sure user is authorised to access route
    if (req.params.userId !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this route`, 401));
    }

    let deck = await Deck.find({ _id: req.params.id, user: req.params.userId });

    if (deck.length === 0) {
      return next(new ErrorResponse(`Deck not found with id of ${req.params.id}`, 404));
    }

    // Look for deck name in database to ensure it is unique
    const deckbyName = await Deck.findOne({ name: req.body.name, user: req.params.userId });

    if (deckbyName) {
      return next(new ErrorResponse(`Deck with name ${req.body.name} already exists`, 400));
    }

    deck = await Deck.findByIdAndUpdate(req.params.id, req.body);

    res.json({ succes: true, data: deck });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a deck
// @url     DELETE /api/v1/decks/:userId/:id
// @access  private
exports.deleteDeck = async (req, res, next) => {
  try {
    // Make sure user is authorised to access route
    if (req.params.userId !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this route`, 401));
    }

    const deck = await Deck.find({ _id: req.params.id, user: req.params.userId });

    if (deck.length === 0) {
      return next(new ErrorResponse(`Deck not found with id of ${req.params.id}`, 404));
    }

    deck[0].remove();

    res.status(200).json({ succes: true, data: {} });
  } catch (err) {
    next(err);
  }
};
