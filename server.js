const express = require('express');
const dotenv = require('dotenv');
const deckRoutes = require('./routes/decks');

dotenv.config({ 'path': './config/config.env' })

const app = express();

app.use('/api/v1/decks', deckRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));



