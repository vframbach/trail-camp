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
      "about": "about",
      ".*": "home"
    },

    city: function(params) {
      $('#nav-container').show();
        // GET /api/campsites{lat, lon}
      var lookup = {
        losangeles: { lat: 34.0500, lon:-118.2500, displayName: "Los Angeles" },
        sanfrancisco: { lat: 37.7833, lon:-122.4167, displayName: "San Francisco" },
        portland: { lat: 45.5200, lon:-122.6819, displayName: "Portland" },
        seattle: { lat: 47.6097, lon: -122.3331, displayName: "Seattle" }
      };
      var cityData = lookup[params];
      if (app.mapbox) app.mapbox.remove();
      L.mapbox.accessToken = 'pk.eyJ1IjoidmZyYW1iYWNoIiwiYSI6ImNpanN4ZGs5eTBoY3B1b2x4c3BwZnczNmsifQ.bI3hNg0PQJ68O3_iA30b0A';
      app.mapbox = L.mapbox.map('map-container', 'mapbox.streets', {
        minZoom: 5,
        maxZoom: 13,
      }).setView([cityData.lat, cityData.lon], 8);
      app.mapbox.touchZoom.disable();
      app.mapbox.scrollWheelZoom.disable();

      $.get('/api/campsites', cityData, function(campsites) {
        var campsiteCollection = new CampsiteCollection(campsites);

        // When the GET returns, then do:
        var campsitesView = new CampsitesView({
          collection: campsiteCollection,
          city: cityData.displayName
        });
        campsitesView.render();
      });
    },

    // hiding and showing various views from pages

    home: function(params) {
      $('#nav-container').hide();
      $('#results').hide();
      $('#about-container').hide();
      $('#city-images').show();
      console.log('home');
    },

    about: function(params) {
      $('#nav-container').show();
      $('#about-container').show();
      $('#results').hide();
      $('#city-images').hide();
      console.log('about');
    }

  });
  app.router = new AppRouter();
  Backbone.history.start();
});