'use strict';

var express = require('express');
var mongodb = require('mongodb');

var router = express.Router();

router.get('/', function(req, res, next) {
  mongodb.connect('mongodb://localhost:27017/tdc2016', function(err, db) {
    console.log("Succesfully connected to MongoDB");

    var queryByCategory = (req.query.category) ? {category : req.query.category} : {};

    console.log('Category' + queryByCategory);

    var features = [];

    db.collection('locations').find(queryByCategory, {'_id' : 0}).toArray(function(err, docs) {
      for (var i = 0; i < docs.length; i++) {
        let feature = {type : 'Feature'};
        feature.properties = {};
        feature.geometry = {};

        feature.properties.category = docs[i].category;
        feature.properties.name = docs[i].name;

        feature.geometry.type = docs[i].location.type;
        feature.geometry.coordinates = docs[i].location.coordinates;

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
