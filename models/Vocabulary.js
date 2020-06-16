const mongoose = require('mongoose');

const VocabularySchema = new mongoose.Schema({
  front: {
    type: String,
    required: [true, 'Please add vocabulary front side'],
  },
  back: {
    type: String,
    required: [true, 'Please add vocabulary back side'],
  },
  reviewDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6],
    default: 1,
  },
  new: {
    type: Boolean,
    default: true,
  },
  deck: {
    type: mongoose.Schema.ObjectId,
    ref: 'Deck',
    required: true,
  },

});

// Recalculate Decks' number of vocabulary, new vocabulary and reviews
VocabularySchema.statics.getVocabCount = async function (deckId) {
  try {
    const VocabCount = await this.model('Vocabulary').countDocuments({ deck: deckId });

    const NewVocabCount = await this.model('Vocabulary').countDocuments({ deck: deckId, new: true });

    const ReviewVocabCount = await this.model('Vocabulary').countDocuments({ deck: deckId, new: false, reviewDate: { $lte: new Date() } });

    console.log(`Vocabulary count: ${VocabCount} New Vocabulary count: ${NewVocabCount}
    Review Vocabulary count ${ReviewVocabCount}`);

    await this.model('Deck').findByIdAndUpdate(deckId, {
      countAll: VocabCount,
      countNew: NewVocabCount,
      countReview: ReviewVocabCount,
    });
  } catch (err) {
    console.error(err);
  }
};

// Update number of cards in Deck after save
VocabularySchema.post('save', function () {
  this.constructor.getVocabCount(this.deck);
});


// Update number of cards in Deck before remove
VocabularySchema.pre('remove', function () {
  this.constructor.getVocabCount(this.deck);
});

// Update reviewDate based on card status
VocabularySchema.pre('save', function (next) {
  switch (this.status) {
    case 2:
      this.reviewDate.setDate(this.reviewDate.getDate() + 1);
      break;
    case 3:
      this.reviewDate.setDate(this.reviewDate.getDate() + 4);
      break;
    case 4:
      this.reviewDate.setDate(this.reviewDate.getDate() + 7);
      break;
    case 5:
      this.reviewDate.setDate(this.reviewDate.getDate() + 30);
      break;
    case 6:
      this.reviewDate = null;
      break;
    default:
      break;
  }
  next();
});

module.exports = mongoose.model('Vocabulary', VocabularySchema);
