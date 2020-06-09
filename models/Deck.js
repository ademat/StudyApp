const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    maxlength: 20
  },
  countAll: Number,
  countNew: Number,
  countReview: Number
});

module.exports = mongoose.model('Deck', DeckSchema);