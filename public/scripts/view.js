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
    L.mapbox.featureLayer().setGeoJSON([{
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [this.model.get('location').lon, this.model.get('location').lat]
      },
      "properties": {
        "title": this.model.get('name'),
        "marker-symbol": "campsite"
      }
    }]).addTo(app.mapbox);
    this.$el.html(this.template(this.model.toJSON()));
  },
  // adds trail markers to map
  trailButtonClick:function(e) {
    console.log(this.model.toJSON());
    var self = this;

    this.model.get('topTrails').forEach(function(trail) {
      L.mapbox.featureLayer().setGeoJSON([{
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [trail.location.lon, trail.location.lat]
        },
        "properties": {
          "title": trail.name,
          "marker-color": "#e81049",
          "marker-symbol": "pitch"
        }
      }]).addTo(app.mapbox);

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

