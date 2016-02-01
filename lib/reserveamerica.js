require('dotenv').config();
var request = require('request');
var cheerio = require('cheerio');

module.exports = function(querystring, callback) {
  var activeUrl = 'http://api.amp.active.com/camping/campgrounds?' + querystring + '&api_key=' + process.env.RESERVEAMERICA_KEY;

  request(activeUrl, function (err, response, body) {
    var $ = cheerio.load(body, {
      normalizeWhitespace: true,
      xmlMode: true
    });

    var campsiteData = $('resultset result').map(function (resultIndex, result) {
      return {
        name: $(result).attr('facilityName'),
        location: {
          lat: +$(result).attr('latitude'),
          lon: +$(result).attr('longitude')
        }  
      };
    }).get();

    console.log(campsiteData.length, 'things found');
    console.log('Here is the second thing:', campsiteData[0]);

    callback(campsiteData);
  });
 };