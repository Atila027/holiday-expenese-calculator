'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const env = process.env.NODE_ENV || 'development';

const indexRouter = require('./routes/index');
const payoutsRouter = require('./routes/payouts');

const app = express();

// CORS Handling:
const whitelist = [
  'http://localhost:4200'
];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else if (env === 'development' || env === 'demo') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));

// View engine setup:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routing
 */
app.use('/', indexRouter);
app.use('/payouts', payoutsRouter);

/**
 * Error Handling
 */

// Catch 404 and forward to error handler
app.use(async (request, response, next) => {
  next(createError(404));
});

// Error handler
app.use((error, request, response, next) => {
  console.error('An error has occurred')
  console.error(error);

  response.status(error.status || 500);
  return response.json( { message: error.message })
});

module.exports = app;
