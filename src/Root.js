import React, { Component, PropTypes } from 'react';
import { Router, Route } from 'react-router';
import TopStoriesContainer from './containers/TopStoriesContainer';
import NewestStoriesContainer from './containers/NewStoriesContainer';
import ShowStoriesContainer from './containers/ShowStoriesContainer';
import ShowNewestStoriesContainer from './containers/ShowNewStoriesContainer';
import AskStoriesContainer from './containers/AskStoriesContainer';
import JobsStoriesContainer from './containers/JobsStoriesContainer';
import StoryContainer from './containers/StoryContainer';
import UserContainer from './containers/UserContainer';

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
          <Route path="ask" component={AskStoriesContainer}/>
          <Route path="jobs" component={JobsStoriesContainer}/>
          <Route path="item" component={StoryContainer}/>
          <Route path="user" component={UserContainer}/>
        </Route>
      </Router>
    );
  }
}

// TODO: Add removed routes
/*
 <Route path="newcomments" component={CommentsStoriesComponent}/>
 <Route path="user" component={UserComponent}/>
 <Route path="item" component={ItemComponent}/>
 <Route path="submitted" component={SubmittedComponent}/>
 <Route path="threads" component={ThreadsComponent}/>
 */
