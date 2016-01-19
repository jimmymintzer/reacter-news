import React, { Component, PropTypes } from 'react';
import { Router, Route } from 'react-router';
import StoriesComponent from './components/stories/StoriesComponent';
import NewestStoriesComponent from './components/stories/NewestStoriesComponent';
import CommentsStoriesComponent from './components/comments/CommentsStoriesComponent';
import ShowHNStoriesComponent from './components/showhn/ShowHNStoriesComponent';
import NewestShowHNStoriesComponent from './components/showhn/NewestShowHNStoriesComponent';
import AskHNStoriesComponent from './components/askhn/AskHNStoriesComponent';
import UserComponent from './components/users/UserComponent';
import ItemComponent from './components/items/ItemComponent';
import JobsComponent from './components/jobs/JobsComponent';
import SubmittedComponent from './components/users/SubmittedComponent';
import ThreadsComponent from './components/users/ThreadsComponent';

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
          <Route path="/" component={StoriesComponent}/>
          <Route path="news" component={StoriesComponent}/>

        </Route>
      </Router>
    );
  }
}

/*
 <Route path="newest" component={NewestStoriesComponent}/>
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
