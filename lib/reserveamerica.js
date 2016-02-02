require('dotenv').config();
var request = require('request');
var cheerio = require('cheerio');

module.exports = function(lat, lon, callback) {
  var activeUrl = 'http://api.amp.active.com/camping/campgrounds?landmarkName=true&landmarkLat='+ lat + '&landmarkLong=' + lon + '&api_key=' + process.env.RESERVEAMERICA_KEY;

  request(activeUrl, function (err, response, body) {
    if (err) { 
      console.log("error message!", err);
    }  
    var $ = cheerio.load(body, {
      normalizeWhitespace: true,
      xmlMode: true
    });

    $('resultset result').each(function (resultIndex, result) {
      var campsite = {
        name: $(result).attr('facilityName'),
        location: {
          lat: +$(result).attr('latitude'),
          lon: +$(result).attr('longitude')
        }  
      };
      console.log(campsite.name);
      callback(campsite);
    });
  });
 };