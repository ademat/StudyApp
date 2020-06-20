const express = require('express');
const dotenv = require('dotenv');
require('colors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const deckRoutes = require('./routes/decks');
const vocabularyRoutes = require('./routes/vocabulary');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use('/api/v1/decks', deckRoutes);
app.use('/api/v1/vocabulary', vocabularyRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold));
