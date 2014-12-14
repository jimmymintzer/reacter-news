var React = require('react');
var Router = require('react-router');
var ReacterNewsWebAPIUtils = require('../utils/ReacterNewsWebAPIUtils');

var ItemComponent = React.createClass({
  mixins: [Router.State],
  statics :{
    willTransitionTo: function(transition, params) {
      ReacterNewsWebAPIUtils.getUser(params);
    },

    willTransitionFrom: function(transition, component) {
      console.log("transition", transition);
      console.log("component", component);
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