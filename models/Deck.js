const mongoose = require('mongoose');
const slugify = require('slugify');

const DeckSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    maxlength: 20,
    required: [true, 'Please add Deck name'],
  },
  slug: String,
  countAll: Number,
  countNew: Number,
  countReview: Number,
});

// Create deck slug from the name
DeckSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Deck', DeckSchema);
