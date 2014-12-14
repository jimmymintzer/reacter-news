var React = require('react');
var Router = require('react-router');
var ReacterNewsWebAPIUtils = require('../utils/ReacterNewsWebAPIUtils');

var ItemComponent = React.createClass({
  mixins: [Router.State],
  statics :{
    willTransitionTo: function(transition, params, query) {
      console.log("willTransitionTo");
    }
  },
  render: function() {
    return (
      <div>
        <h1>Items Here</h1>
        <h1>{this.getQuery().id}</h1>
      </div>
    );
  }
});

module.exports = ItemComponent;