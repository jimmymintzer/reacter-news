var React = require('react');
var ReacterNewsApp = require('./components/ReacterNewsApp');
var StoriesComponent = require('./components/stories/StoriesComponent');
var UserComponent = require('./components/users/UserComponent');
var ItemComponent = require('./components/items/ItemComponent');
require('../scss/styles.scss');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var HistoryLocation = Router.HistoryLocation;

var routes = (
  <Route name="app" path="/" handler={ReacterNewsApp}>
    <Route name="news" handler={StoriesComponent} />
    <Route name="newcomments" handler={StoriesComponent} />
    <Route name="show" handler={StoriesComponent} />
    <Route name="ask" handler={StoriesComponent} />
    <Route name="user" handler={UserComponent} />
    <Route name="item" handler={ItemComponent} />
    <DefaultRoute handler={StoriesComponent} />
  </Route>
);

Router.run(routes, HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById('container'));
});
