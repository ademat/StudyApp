const express = require('express');
const dotenv = require('dotenv');
const deckRoutes = require('./routes/decks');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());

app.use('/api/v1/decks', deckRoutes);


connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));
