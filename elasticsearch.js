require('dotenv').config();
var elasticsearch = require('elasticsearch');
var everytrail = require('./lib/everytrail');

var client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_URL,
  log: 'trace'
});

everytrail('lat=47.6097&lon=-122.3331&proximity=20', function(everyTrailData) {
  console.log('Everytrail');
  console.log(everyTrailData.length, 'things found');
  console.log('Here is the first thing:', everyTrailData[0]);

  var bulkActions = [];
  everyTrailData.forEach(function (trail) {
    bulkActions.push({
      create: {
        _index: 'trails',
        _type: 'trail'
      }
    });
    bulkActions.push(trail);
  });

  client.bulk({ body: bulkActions });
});