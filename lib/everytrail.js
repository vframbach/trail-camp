require('dotenv').config();
var request = require('request');
var cheerio = require('cheerio');

module.exports = function (lat, lon, callback) {
  var everyTrailUrl = 'http://' + process.env.EVERYTRAIL_KEY + ':' + process.env.EVERYTRAIL_SECRET + '@www.everytrail.com/api/trip/search?limit=200&proximity=20&lat=' + lat + '&lon=' + lon;
  console.log('(everytrail api) searching for ', everyTrailUrl);

  request(everyTrailUrl, function (err, response, body) {
    var $ = cheerio.load(body, {
      normalizeWhitespace: true,
      xmlMode: true
    });

    var everyTrailData = $('etTripSearchResponse trips trip').map(function (resultIndex, result) {
      return {
        name: $(result).find('name').text(),
        trip_id: +$(result).attr('id'),
        location: {
          lat: +$(result).find('location').attr('lat'),
          lon: +$(result).find('location').attr('lon')
        },
        length: +$(result).find('length').text() / 1609.34,
        location_name: $(result).find('location').text()
      };
    }).get();

    console.log('(everytrail api) returned', everyTrailData.length, 'things');
    console.log('(everytrail api) Here is the first thing:', everyTrailData[0]);
    callback (everyTrailData);
  });
};
