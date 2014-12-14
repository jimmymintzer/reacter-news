var React = require('react');
var ReacterNewsApp = require('./components/ReacterNewsApp');
var ReacterNewsWebAPIUtils = require('./utils/ReacterNewsWebAPIUtils');
var StoriesComponent = require('./components/StoriesComponent');
var UserComponent = require('./components/UserComponent');
var ItemComponent = require('./components/ItemComponent');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
  <Route name="app" path="/" handler={ReacterNewsApp}>
    <Route name="new" handler={StoriesComponent} />
    <Route name="newcomments" handler={StoriesComponent} />
    <Route name="show" handler={StoriesComponent} />
    <Route name="ask" handler={StoriesComponent} />
    <Route name="user" handler={UserComponent} />
    <Route name="item" handler={ItemComponent} />
    <DefaultRoute handler={StoriesComponent} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.getElementById('container'));
});
