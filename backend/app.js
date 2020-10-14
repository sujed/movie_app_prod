const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');

dotenv.config({ path: './config/config.env' });

const app = express();

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting - 100req/10m
const limiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again in 3 minutes.',
});

app.use(express.json());

const indexRouter = require('./routes/index');

app.use('/api/v1/movies', limiter, indexRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({ api_status: true, message: 'running.' });
  });
}

//This will caught any exeptions.
app.use(errorHandler);

module.exports = app;
