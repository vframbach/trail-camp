var CampsiteView = Backbone.View.extend({
  tagName: 'ul', // defaults to div if not specified
  className: 'campsite', 
  events: {
    'click .trail-button': 'trailButtonClick'
  },
  initialize: function() {
    this.template = _.template($('#campsite-template').html());
    this.render(); 
  },

  render: function() {
    L.marker([this.model.get('location').lat, this.model.get('location').lon]).addTo(app.mapbox);
    this.$el.html(this.template(this.model.toJSON()));
  },
  // adds trail markers to map
  trailButtonClick:function(e) {
    console.log(this.model.toJSON());

    this.model.get('topTrails').forEach(function(trail) {
      L.marker([trail.location.lat, trail.location.lon]).addTo(app.mapbox);
      this.$el.html(this.template(this.model.toJSON()));

      var featureLayer = L.mapbox.featureLayer()
        .on('ready', function(layer) {
          this.eachLayer(function(marker) {
            // See the following for styling hints:
            // https://help.github.com/articles/mapping-geojson-files-on-github#styling-features
            marker.setIcon(L.mapbox.marker.icon({
                'marker-color': '#CC0000'
            }));
        });
    })
    .addTo(map);
    });
  }
});

// View for all campsites (collection)
var CampsitesView = Backbone.View.extend({ // calling this CampsitesView to distinguish as the view for the collection
  tagName: 'ul',
  initialize: function(){
    this.collection;
  },

  // hiding other views from page
  render: function(){
    $("#city-images").hide();
    $("#about-container").hide();
    $('#campsite-container').empty();
    this.collection.each(function(campsite){
      var campsiteView = new CampsiteView({model: campsite});
      $('#campsite-container').append(campsiteView.el);
    });
    $('#results').show();
    // fixes issue of map not loading on first page load
    app.mapbox.invalidateSize();
  }
});

var ContainerView = Backbone.View.extend({
  tagName: 'div', // defaults to div if not specified
  className: 'container', // optional
  events: {
    'route':         'handleRouteChange'
  },
  initialize: function() {
    this.render(); // render is an optional function that defines the logic for rendering a template
  },
  render: function() {
    this.$el.html();
  },
  handleRouteChange: function (route, params) {
    console.log("handling trail route", route, params);
  }
});

