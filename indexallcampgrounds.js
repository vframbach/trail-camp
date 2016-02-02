require('dotenv').config();
var elasticsearch = require('elasticsearch');
var reserveamerica = require('./lib/reserveamerica');

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


function indexCampsite(campsite) {
    getClosestTrails(campsite, function(topTrails) {
        var bulkActions = [];
        bulkActions.push({
            create: {
                _index: 'campsites',
                _type: 'campsite'
            }
        });
        campsite.topTrails = topTrails;
        console.log(campsite);
        bulkActions.push(campsite);

        client.bulk({
            body: bulkActions
        });
    });
}

function getClosestTrails(campsite, callback) {
    client.search({
        index: 'trails',
        type: 'trail',
        body: {
            "query": {
                "filtered": {
                    "query": {
                        "match_all": {}
                    },
                    "filter": {
                        "geo_distance": {
                            "distance": "200km",
                            "location": {
                                "lat": campsite.location.lat,
                                "lon": campsite.location.lon
                            }
                        }
                    }
                }
            },
            "sort": [{
                "_geo_distance": {
                    "location": {
                        "lat": campsite.location.lat,
                        "lon": campsite.location.lon
                    },
                    "order": "asc",
                    "unit": "km"
                }
            }]
        }
    }).then(function(resp) {
        var hits = resp.hits.hits;
        var sources = hits.map(function(hit) {
            return hit._source;
        });
        var topHits = sources.slice(0, 3);
        callback(topHits);
    }, function(err) {
        console.trace(err.message);
    });
}


for (var cityname in lookup) {
    var city = lookup[cityname];
    console.log(cityname);
    reserveamerica(city.lat, city.lon, indexCampsite);
}