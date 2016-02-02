var app = {};



$(function(){
	// // GET /api/trails {lat, lon}
	// $.get('/api/trails', {lat:45.5, lon:-122.68}, function(trails) {
	//   var trailCollection = new TrailCollection(trails);

	//   // When the GET returns, then do:
	//   var trailsView = new TrailsView({collection: trailCollection});
	//   trailsView.render();
	// });



	app.appView = new ContainerView({ el: $( '#app-container' ) });
	var AppRouter = Backbone.Router.extend({

    routes: {
      "city/:city": "city",
      "home": "home"
    },

    city: function(params) {
        // GET /api/campsites{lat, lon}
      var lookup = {
        losangeles: { lat: 34.0500, lon:-118.2500 },
        sanfrancisco: { lat: 37.7833, lon:-122.4167 },
        portland: { lat: 45.5200, lon:-122.6819 },
        seattle: { lat: 47.6097, lon: -122.3331 }
      };
      var cityLatLon = lookup[params];
      if (this.mapbox) this.mapbox.remove();
      L.mapbox.accessToken = 'pk.eyJ1IjoidmZyYW1iYWNoIiwiYSI6ImNpanN4ZGs5eTBoY3B1b2x4c3BwZnczNmsifQ.bI3hNg0PQJ68O3_iA30b0A';
      this.mapbox = L.mapbox.map('map-container', 'mapbox.streets').setView([cityLatLon.lat, cityLatLon.lon], 11);
      $.get('/api/campsites', cityLatLon, function(campsites) {
        var campsiteCollection = new CampsiteCollection(campsites);

        // When the GET returns, then do:
        var campsitesView = new CampsitesView({collection: campsiteCollection});
        campsitesView.render();
      });
      console.log('city:', params);
    },

    home: function(params) {
      console.log('home');
    }

  });
  app.router = new AppRouter;
  Backbone.history.start();
});