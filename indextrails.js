require('dotenv').config();
var elasticsearch = require('elasticsearch');
var everytrail = require('./lib/everytrail');

var client = new elasticsearch.Client({
    host: process.env.ELASTICSEARCH_URL
});

var lookup = {
    losangeles: {
        lat: 34.0500,
        lon: -118.2500
    },
    sanfrancisco: {
        lat: 37.7833,
        lon: -122.4167
    },
    portland: {
        lat: 45.5200,
        lon: -122.6819
    },
    seattle: {
        lat: 47.6097,
        lon: -122.3331
    }
};

function indexTrail(everyTrailData) {
    console.log('(indextrail)');
    console.log('(indextrail)', everyTrailData.length, 'things found');
    console.log('(indextrail) Here is the first thing:', everyTrailData[0]);

    var bulkActions = [];
      
    everyTrailData.forEach(function(trail) {
        bulkActions.push({
            create: {
                _index: 'trails',
                _type: 'trail'
            }
        });
        bulkActions.push(trail);
    });

    client.bulk({
        body: bulkActions
    });
}

var cities = Object.keys(lookup);
cities.forEach(function (cityname) {
  var city = lookup[cityname];
  console.log(cityname);
  everytrail(city.lat, city.lon, indexTrail);
});
