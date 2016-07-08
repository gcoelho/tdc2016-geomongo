'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var locations = require('./routes/locations');
var checkins = require('./routes/checkins');
var attendees = require('./routes/attendees');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static pages
app.use(express.static(path.join(__dirname, 'public')));

// routing to dynamic pages
app.use('/checkins', checkins);
app.use('/locations', locations);
app.use('/attendees', attendees);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('404 Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(err);
  console.log(err);
});

module.exports = app;
