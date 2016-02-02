
// GET /api/trails {lat, lon}
$.get('/api/trails', {lat:45.5, lon:-122.68}, function(trails) {
  var trailCollection = new TrailCollection(trails);

  // When the GET returns, then do:
  var trailsView = new TrailsView({collection: trailCollection});
  trailsView.render();
});

// GET /api/campsites{lat, lon}
$.get('/api/campsites', {lat:47.6097, lon:-122.3331}, function(campsites) {
  var campsiteCollection = new CampsiteCollection(campsites);

  // When the GET returns, then do:
  var campsitesView = new CampsitesView({collection: campsiteCollection});
  campsitesView.render();
});

