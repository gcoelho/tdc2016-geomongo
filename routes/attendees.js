'use strict';

var express = require('express');
var mongodb = require('mongodb');

var router = express.Router();

router.get('/', function(req, res, next) {
  mongodb.connect('mongodb://localhost:27017/tdc2016', function(err, db) {
    console.log("Succesfully connected to MongoDB");

    var queryByDate = (req.query.date) ? {date : req.query.date} : {};

    console.log('Date: ', queryByDate);

    db.collection('locations').find({name : "Universidade Anhembi Morumbi"}, {"_id":0, "location":1}).next(function(err, location) {
      var count = 0;

      db.collection('checkins').find({ $and : [queryByDate, { position : { $geoWithin : { $geometry : location.location }}}]}, {"_id":0}).forEach(
        function(checkin) {
          count++;
          console.log(JSON.stringify(checkin));
        },
        function(err) {
          db.close();

          res.setHeader('Content-Type', 'application/json');
          res.json({ attendees : count });
      });
    });
  });
});

module.exports = router;
