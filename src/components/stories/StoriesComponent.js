import React, { Component } from 'react';
var Router = require('react-router');
var Link = Router.Link;

var StoryComponent = require('./../common/StoryComponent');
var StoriesStore = require('../../stores/StoriesStore');
var LoaderComponent = require('../common/LoaderComponent');
var SpacerComponent = require('./../common/SpacerComponent');
var FooterComponent = require('./../common/FooterComponent');
var APIUtils = require('../../utils/ReacterNewsWebAPIUtils');

function getStateFromStores(page) {
  return {
    stories: StoriesStore.getStoriesByPage(page),
    loading: StoriesStore.getLoadingStatus(),
    initialized: StoriesStore.getInitializedState(),
  };
}

var StoriesComponent = React.createClass({
  componentWillMount: function() {
    APIUtils.getTopStories();
  },
  componentDidMount: function() {
    StoriesStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    StoriesStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this._setState() ;
  },
  _setState: function() {
    if(this.isMounted()) {
      var page = 1; // this.getQuery().p || 1;
      this.setState(getStateFromStores(page));
    }
  },
  getInitialState: function() {
    //var page = this.getQuery().p || 1;
    const page = 1;
    return getStateFromStores(page);
  },
  handleClick: function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  render: function() {
    document.title = 'Reacter News';

    var stories = this.state.stories.map((story, index) => {

      return (
        <li key={index}>
          <StoryComponent story={story} />
        </li>
      );
    });

    if(this.state.loading && !this.state.initialized) {
      var renderedHTML = <LoaderComponent />;
    }
    else {
      var page = 1; // parseInt(this.getQuery().p) || 1;
      var index = (30 * (page-1)) + 1;
      var nextPage = page + 1;

      var link = (this.state.stories.size === 30) ?
        <Link to='news' query={{ p: nextPage }} onClick={this.handleClick}>More</Link>
        : null;


      var renderedHTML = (
        <div>
          <ol className='stories' start={index}>
          {stories.toArray()}
          </ol>
          <div className='more-link'>
          {link}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className='main'>
        {renderedHTML}
        </div>
        <SpacerComponent />
        <FooterComponent />
      </div>
    )
  }


});

module.exports = StoriesComponent;
