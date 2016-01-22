import React, { Component, PropTypes } from 'react';
import { Router, Route } from 'react-router';
import TopStoriesContainer from './containers/TopStoriesContainer';
import NewestStoriesContainer from './containers/NewestStoriesContainer';
import ShowStoriesContainer from './containers/ShowStoriesContainer';
import ShowNewestStoriesContainer from './containers/ShowNewestStoriesContainer';
import App from './App';

export default class Root extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  render() {
    const { history } = this.props;

    return (
      <Router history={history}>
        <Route component={App}>
          <Route path="/" component={TopStoriesContainer}/>
          <Route path="news" component={TopStoriesContainer}/>
          <Route path="newest" component={NewestStoriesContainer}/>
          <Route path="show" component={ShowStoriesContainer}/>
          <Route path="shownew" component={ShowNewestStoriesContainer}/>
        </Route>
      </Router>
    );
  }
}

// TODO: Add removed routes
/*
 <Route path="newcomments" component={CommentsStoriesComponent}/>
 <Route path="show" component={ShowHNStoriesComponent}/>
 <Route path="shownew" component={NewestShowHNStoriesComponent}/>
 <Route path="ask" component={AskHNStoriesComponent}/>
 <Route path="user" component={UserComponent}/>
 <Route path="item" component={ItemComponent}/>
 <Route path="jobs" component={JobsComponent}/>
 <Route path="submitted" component={SubmittedComponent}/>
 <Route path="threads" component={ThreadsComponent}/>
 */
