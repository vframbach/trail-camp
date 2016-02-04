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
    var linkElement = '<a href="http://www.reserveamerica.com/campsiteSearch.do?contractCode=' + this.model.get('contract_id') + '&parkId=' + this.model.get('facility_id') + '" target="_blank">More info</a>';
    console.log(linkElement);
    this.campMarker = L.mapbox.featureLayer().setGeoJSON([{
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [this.model.get('location').lon, this.model.get('location').lat]
      },
      "properties": {
        "title": this.model.get('name'),
        "description": linkElement,
        "marker-symbol": "campsite",
        "marker-color": "#23527C"
      }
    }]).addTo(app.mapbox);
    this.$el.html(this.template(this.model.toJSON()));
  },
  // adds trail markers to map
  trailButtonClick:function(e) {
    console.log(this.model.toJSON());
    var self = this;
    this.campMarker.eachLayer(function(m) {
      m.openPopup();
    });
    this.model.get('topTrails').forEach(function(trail) {
      var trailLink = '<a href="http://www.everytrail.com/view_trip.php?trip_id=' + trail.trip_id + '" target="_blank">More info</a>';
      L.mapbox.featureLayer().setGeoJSON([{
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [trail.location.lon, trail.location.lat]
        },
        "properties": {
          "title": trail.name,
          "description": trail.length.toFixed(1) + ' miles - ' + trailLink, 
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
  initialize: function(options){
    this.options = options;
  },

  // hiding other views from page
  render: function(){
    $("#city-images").hide();
    $("#about-container").hide();
    $('#cityName').text(this.options.city);
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

