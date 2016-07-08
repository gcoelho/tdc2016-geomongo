'use strict';

var express = require('express');
var mongodb = require('mongodb');

var router = express.Router();

router.get('/', function (req, res, next) {
  mongodb.connect('mongodb://localhost:27017/tdc2016', function(err, db) {
    console.log('Succesfully connected to MongoDB');

    var queryByDate = (req.query.date) ? {date : req.query.date} : {};

    console.log('Date: ', queryByDate);

    var features = [];

    db.collection('checkins').find(queryByDate, {'_id' : 0}).toArray(function(err, docs) {
      for (var i = 0; i < docs.length; i++) {
        let feature = {type : 'Feature'};
        feature.properties = {};
        feature.geometry = {};

        feature.properties.date = docs[i].date;
        feature.properties.name = docs[i].name;

        feature.geometry.type = docs[i].position.type;
        feature.geometry.coordinates = docs[i].position.coordinates;

        features.push(feature);
      }
      db.close();

      let featureCollection = {};
      featureCollection.type = 'FeatureCollection';
      featureCollection.features = features;

      res.setHeader('Content-Type', 'application/json');
      res.json(featureCollection);
    });
  });
});

module.exports = router;
