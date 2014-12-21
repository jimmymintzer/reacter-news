var React = require('react');
var HeaderComponent = require('./common/HeaderComponent');

var Router = require('react-router');
var RouterHandler = Router.RouteHandler;

var ReacterNewsApp = React.createClass({
  render: function() {
    return (
      <div>
        <HeaderComponent />
        <RouterHandler />
      </div>
    )
  }
});



module.exports = ReacterNewsApp;