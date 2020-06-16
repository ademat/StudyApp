const ErrorResponse = require('../utils/errorResponse');
const Vocabulary = require('../models/Vocabulary');

// @desc    Get all available vocabulary
// @url     GET /api/v1/vocabulary
// @url     GET /api/v1/decks/:decksId/vocabulary
// @access  private
exports.getVocabulary = async (req, res, next) => {
  try {
    let query;

    if (req.params.deckId) {
      query = Vocabulary.find({ deck: req.params.deckId });
    } else {
      query = Vocabulary.find().populate({
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
