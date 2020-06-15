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
  deck: {
    type: mongoose.Schema.ObjectId,
    ref: 'Deck',
    required: true,
  },

});

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
