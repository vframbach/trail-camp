
// GET /api/trails {lat, lon}
$.get('/api/trails', {lat:45.5, lon:-122.68}, function(trails) {
  var trailCollection = new TrailCollection(trails);

  // When the GET returns, then do:
  var trailsView = new TrailsView({collection: trailCollection});
  trailsView.render();
});

