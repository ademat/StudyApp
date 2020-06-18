const ErrorResponse = require('../utils/errorResponse');
const Vocabulary = require('../models/Vocabulary');
const Deck = require('../models/Deck');

// @desc    Get all available vocabulary
// @url     GET /api/v1/vocabulary/:userId
// @url     GET /api/v1/decks/:userId/:decksId/vocabulary
// @access  private
exports.getVocabulary = async (req, res, next) => {
  try {
    // Make sure user is authorised to access route
    if (req.params.userId !== req.user.id) {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this route`, 401));
    }

    let query;

    if (req.params.deckId) {
      query = Vocabulary.find({ deck: req.params.deckId, user: req.params.userId });
    } else {
      query = Vocabulary.find({ user: req.params.userId }).populate({
        path: 'deck',
        select: 'name',
      });
    }

    const vocabulary = await query;

    res.status(200).json({
      success: true,
      count: vocabulary.length,
      data: vocabulary,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single vocabulary
// @url     GET /api/v1/vocabulary/:userId/:id
// @access  private
exports.getSingleVocabulary = async (req, res, next) => {
  try {
    // Make sure user is authorised to access route
    if (req.params.userId !== req.user.id) {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this route`, 401));
    }

    const vocabulary = await Vocabulary.find({ _id: req.params.id, user: req.params.userId }).populate({
      path: 'deck',
      select: 'name',
    });

    if (vocabulary.length === 0) {
      return next(new ErrorResponse(`Vocabulary with id ${req.params.id} was not found`, 404));
    }

    res.status(200).json({
      success: true,
      data: vocabulary,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add single vocabulary
// @url     POST /api/v1/decks/:deckId/vocabulary/:userId
// @access  private
exports.addVocabulary = async (req, res, next) => {
  try {
    // Make sure user is authorised to access route
    if (req.params.userId !== req.user.id) {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this route`, 401));
    }

    req.body.deck = req.params.deckId;

    req.body.user = req.params.userId;

    const deck = await Deck.find({ _id: req.params.deckId, user: req.params.userId });

    if (deck.length === 0) {
      return next(new ErrorResponse(`Deck with id ${req.params.deckId} was not found`, 404));
    }

    const vocabulary = await Vocabulary.create(req.body);

    res.status(200).json({
      success: true,
      data: vocabulary,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update vocabulary
// @url     PUT /api/v1/decks/:userId/:id
// @access  private
exports.updateVocabulary = async (req, res, next) => {
  try {
    // Make sure user is authorised to access route
    if (req.params.userId !== req.user.id) {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this route`, 401));
    }

    let vocabulary = await Vocabulary.find({ _id: req.params.id, user: req.params.userId });

    if (vocabulary.length === 0) {
      return next(new ErrorResponse(`Vocabulary with id ${req.params.id} was not found`, 404));
    }

    vocabulary = await Vocabulary.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: vocabulary,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete vocabulary
// @url     DELETE /api/v1/decks/:userId/:id
// @access  private
exports.deleteVocabulary = async (req, res, next) => {
  try {
    // Make sure user is authorised to access route
    if (req.params.userId !== req.user.id) {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this route`, 401));
    }

    const vocabulary = await Vocabulary.find({ _id: req.params.id, user: req.params.userId });

    if (vocabulary.length === 0) {
      return next(new ErrorResponse(`Vocabulary with id ${req.params.id} was not found`, 404));
    }

    vocabulary[0].remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
