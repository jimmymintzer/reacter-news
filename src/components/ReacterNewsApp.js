var React = require('react');
var HeaderComponent = require('./common/HeaderComponent');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var ReacterNewsApp = React.createClass({
  mixins: [ Router.State ],
  render: function() {
    var name = this.getRoutes().reverse()[0].name + (this.getQuery().p || "");
    return (
      <div>
        <HeaderComponent />
        <ReactCSSTransitionGroup transitionName="animate">
          <RouteHandler key={name}/>
        </ReactCSSTransitionGroup>
      </div>

    )
  }
});


module.exports = ReacterNewsApp;