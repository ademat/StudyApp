const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const Deck = require('./models/Deck');
const Vocabulary = require('./models/Vocabulary');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const decks = JSON.parse(fs.readFileSync(`${__dirname}/_data/decks.json`, 'utf-8'));

const vocabulary = JSON.parse(fs.readFileSync(`${__dirname}/_data/vocabulary.json`, 'utf-8'));

const importData = async () => {
  try {
    await Deck.create(decks);
    // await Vocabulary.create(vocabulary);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const deleteData = async () => {
  try {
    await Deck.deleteMany();
    await Vocabulary.deleteMany();

    console.log('Data Deleted...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
