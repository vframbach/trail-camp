// adding multiple models to collection
var trailCollection = new TrailCollection([
  {
    name: 'Matt Davis',
    location: {
      lat: 41.238,
      lon: -122.213
    },
    length: 4.5,
    location_name: 'Mt Tam'
  },
  {
    name: 'Steep Ravine',
    location: {
      lat: 41.454,
      lon: -122.489
    },
    length: 3.5,
    location_name: 'Mt Tam'
  },
  {
    name: 'Sweeney Ridge',
    location: {
      lat: 41.788,
      lon: -122.567
    },
    length: 5,
    location_name: 'Skyline College'
  }
]);

// creates view for collection and renders collection
var trailsView = new TrailsView({collection: trailCollection});
trailsView.render();
