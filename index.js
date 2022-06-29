const express = require('express');
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const cors = require('cors')
require("dotenv").config()

connectDB()

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use(express.urlencoded({ extended: false }))

// API Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

// Error Handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on http://localhost:${port} `.blue)); //npm run server