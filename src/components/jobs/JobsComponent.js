var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var StoriesMixin = require('../../mixins/StoriesMixin');
var GetTopStoriesAndCommentsMixin = require('../../mixins/GetTopStoriesAndCommentsMixin');

var StoryComponent = require('./../common/StoryComponent');
var StoriesStore = require('../../stores/StoriesStore');
var LoaderComponent = require('../common/LoaderComponent');
var SpacerComponent = require('./../common/SpacerComponent');
var FooterComponent = require('./../common/FooterComponent');


function getStateFromStores() {
  return {
    jobs: StoriesStore.getJobsStories(),
    loading: StoriesStore.getLoadingStatus(),
    initialized: StoriesStore.getInitalizedState()
  };
}

var JobsComponent = React.createClass({
  getDefaultProps: function () {
    return {
      jobs: []
    }
  },
  mixins: [Router.State, StoriesMixin, GetTopStoriesAndCommentsMixin],
  _setState: function() {
    this.setState(getStateFromStores());
  },
  getInitialState: function() {
    return getStateFromStores("all");
  },
  render: function() {
    document.title = "Jobs | Reacter News";
    var jobs = [];

    this.state.jobs.forEach(function(job) {
      var jobComponent = (
        <li key={job.id}>
          <StoryComponent story={job} />
        </li>
      );
      jobs.push(jobComponent);

    }, this);

    if(this.state.loading && !this.state.initialized) {
      var renderedHTML = (
        <LoaderComponent />
      );
    }
    else {
      var renderedHTML = (
        <h3 className="job-header">All the jobs listed here are at startups that were at some point funded by Y Combinator. Some are now established companies. Others may be only a few weeks old.</h3>
          );
    }

    return (
      <div>
        <div className="main">
        {renderedHTML}
          <ol className="stories" start={1}>
          {jobs}
          </ol>
        </div>
        <SpacerComponent />
        <FooterComponent />
      </div>
    )
  }

});

module.exports = JobsComponent;