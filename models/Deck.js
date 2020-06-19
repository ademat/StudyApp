const mongoose = require('mongoose');
const slugify = require('slugify');

const DeckSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 20,
    required: [true, 'Please add Deck name'],
    unique: false,
  },
  slug: String,
  countAll: Number,
  countNew: Number,
  countReview: Number,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Create deck slug from the name
DeckSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Cascade delete vocabulary when a deck is deleted
DeckSchema.pre('remove', async function (next) {
  console.log(`Vocabulary being removed from deck ${this._id}`);

  await this.model('Vocabulary').deleteMany({ deck: this._id });
  next();
});

// Reverse populate with virtuals
DeckSchema.virtual('vocabulary', {
  ref: 'Vocabulary',
  localField: '_id',
  foreignField: 'deck',
  justOne: false,
});

module.exports = mongoose.model('Deck', DeckSchema);
