const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const deckRoutes = require('./routes/decks');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());

app.use('/api/v1/decks', deckRoutes);

app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold));
