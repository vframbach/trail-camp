var TrailView = Backbone.View.extend({
  tagName: 'li', // defaults to div if not specified
  className: 'trail', // optional
  events: {
    'click':         'alertTest',
    'click .edit':   'editTrail',
    'click .delete': 'deleteTrail'
  },
  initialize: function() {
    this.render(); // render is an optional function that defines the logic for rendering a template
  },
  render: function() {
    this.$el.html(this.model.get('name') + ' is at ' + this.model.get('location_name') + ' and the length is ' + this.model.get('length') + ' miles.');
  }
});

// View for all trails (collection)
var TrailsView = Backbone.View.extend({ // calling this TrailsView to distinguish as the view for the collection
  tagName: 'li',
  initialize: function(){
    this.collection;
  },
  render: function(){
    this.collection.each(function(trail){
      var trailView = new TrailView({model: trail});
      $(document.body).append(trailView.el);
    });
  }
});

var CampsiteView = Backbone.View.extend({
  tagName: 'ul', // defaults to div if not specified
  className: 'campsite', // optional
  events: {
    'click':         'alertCampsite',
    'click .edit':   'editCampsite',
    'click .delete': 'deleteCampsite'
  },
  initialize: function() {
    this.render(); // render is an optional function that defines the logic for rendering a template
  },
  render: function() {
    this.$el.html(this.model.get('name') + ' is at ' + this.model.get('location').lat + ', ' + this.model.get('location').lon);
  }
});

// View for all trails (collection)
var CampsitesView = Backbone.View.extend({ // calling this CampsitesView to distinguish as the view for the collection
  tagName: 'ul',
  initialize: function(){
    this.collection;
    L.mapbox.accessToken = 'pk.eyJ1IjoidmZyYW1iYWNoIiwiYSI6ImNpanN4ZGs5eTBoY3B1b2x4c3BwZnczNmsifQ.bI3hNg0PQJ68O3_iA30b0A';
    this.mapbox = L.mapbox.map('map-container', 'mapbox.streets');
  },
  render: function(){
    $("#city-images").hide();
    $('#campsite-container').empty().show();
    this.mapbox.setView([37.7833, -122.4167], 13);
    this.collection.each(function(campsite){
      var campsiteView = new CampsiteView({model: campsite});
      $('#campsite-container').append(campsiteView.el);
    });
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

