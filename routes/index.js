require('dotenv').config();
var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_URL,
  log: 'trace'
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET results page. */
router.get('/results', function(req, res, next) {
  res.render('results', { title: 'Express' });
});

router.get('/api/trails', function(req, res, next) {
	console.log(req.query);
	client.search({
    index: 'trails',
    type: 'trail',
    body: {
      query: {
        "filtered" : {
          "query" : {
            "match_all" : {}
          },
          "filter" : {
            "geo_distance" : {
              "distance" : "40mi",
              "trail.location" : {
                "lat" : req.query.lat,
                "lon" : req.query.lon
              }
            }
          }
        }
      }
    }
  }).then(function (response) {
    res.json(response.hits.hits.map(function(trail) {
      return trail._source;
    }));
  }, function (err) {
    console.trace(err.message);
    res.status(400).end('No results');
  });
});

router.get('/api/campsites', function(req, res, next) {
  console.log(req.query);
  client.search({
    index: 'campsites',
    type: 'campsite',
    body: {
      query: {
        "filtered" : {
          "query" : {
            "match_all" : {}
          },
          "filter" : {
            "geo_distance" : {
              "distance" : "40mi",
              "campsite.location" : {
                "lat" : req.query.lat,
                "lon" : req.query.lon
              }
            }
          }
        }
      }
    }
  }).then(function (response) {
    res.json(response.hits.hits.map(function(campsite) {
      return campsite._source;
    }));
  }, function (err) {
    console.trace(err.message);
    res.status(400).end('No results');
  });
});

module.exports = router;
