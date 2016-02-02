var Trail = Backbone.Model.extend({
  defaults: {
    name: 'unnamed'
  },
  validate: function(attrs, options){
    if (!attrs.name){
        alert('Your trail must have a name!');
    }
    if (attrs.name.length < 2){
        alert('Your trail\'s name must have more than one letter!');
    }
  },
  awesome: function(){
    alert(this.get('name') + ' is awesome.');
  }
});

var Campsite = Backbone.Model.extend({
  defaults: {
    name: 'unnamed'
  },
  validate: function(attrs, options){
    if (!attrs.name){
        alert('Your campsite must have a name!');
    }
    if (attrs.name.length < 2){
        alert('Your campsite\'s name must have more than one letter!');
    }
  },
  awesome: function(){
    alert(this.get('name') + ' is awesome.');
  }
});