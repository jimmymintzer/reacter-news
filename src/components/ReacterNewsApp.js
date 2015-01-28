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
    var routeName = this.getRoutes().reverse()[0].name;
    var queryString = this.getQuery() || '';
    var keyName = (this.getRoutes().reverse()[0].name || 'news') + (this.getQuery().p || '') + (this.getQuery().id || '');

    return (
      <div>
        <HeaderComponent name={routeName} queryString={queryString}/>
        <ReactCSSTransitionGroup transitionName='animate'>
          <RouteHandler key={keyName}/>
        </ReactCSSTransitionGroup>
      </div>

    )
  }
});


module.exports = ReacterNewsApp;