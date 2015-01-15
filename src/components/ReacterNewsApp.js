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
    /*
    Change name to dynamic name to force css transition
     */
    var routeName = this.getRoutes().reverse()[0].name;
    var keyName = this.getRoutes().reverse()[0].name + (this.getQuery().p || "");
    return (
      <div>
        <HeaderComponent name={routeName}/>
        <ReactCSSTransitionGroup transitionName="animate">
          <RouteHandler key={keyName}/>
        </ReactCSSTransitionGroup>
      </div>

    )
  }
});


module.exports = ReacterNewsApp;