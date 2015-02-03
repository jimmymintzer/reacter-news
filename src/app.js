require("6to5/register");
var React = require('react');
var ReacterNewsApp = require('./components/ReacterNewsApp');
var StoriesComponent = require('./components/stories/StoriesComponent');
var UserComponent = require('./components/users/UserComponent');
var ItemComponent = require('./components/items/ItemComponent');
var JobsComponent = require('./components/jobs/JobsComponent');
var NewestStoriesComponent = require('./components/stories/NewestStoriesComponent');
var AskHNStoriesComponent = require('./components/askhn/AskHNStoriesComponent');
var ShowHNStoriesComponent = require('./components/showhn/ShowHNStoriesComponent');
var NewestShowHNStoriesComponent = require('./components/showhn/NewestShowHNStoriesComponent');
var CommentsStoriesComponent = require('./components/comments/CommentsStoriesComponent');
var SubmittedComponent = require('./components/users/SubmittedComponent');
var ThreadsComponent = require('./components/users/ThreadsComponent');
require('../scss/styles.scss');
require('../node_modules/font-awesome/scss/font-awesome.scss');



var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var HistoryLocation = Router.HistoryLocation;

var routes = (
  <Route name='app' path='/' handler={ReacterNewsApp}>
    <Route name='news' handler={StoriesComponent} />
    <Route name='newest' handler={NewestStoriesComponent} />
    <Route name='newcomments' handler={CommentsStoriesComponent} />
    <Route name='show' handler={ShowHNStoriesComponent} />
    <Route name='shownew' handler={NewestShowHNStoriesComponent} />
    <Route name='ask' handler={AskHNStoriesComponent} />
    <Route name='user' handler={UserComponent} />
    <Route name='item' handler={ItemComponent} />
    <Route name='jobs' handler={JobsComponent} />
    <Route name='submitted' handler={SubmittedComponent} />
    <Route name='threads' handler={ThreadsComponent} />
    <DefaultRoute handler={StoriesComponent} />
  </Route>
);

Router.run(routes, HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById('container'));
});
