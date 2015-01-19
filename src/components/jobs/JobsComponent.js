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


function getStateFromStores(page) {
  return {
    jobs: StoriesStore.getJobsStories(page),
    loading: StoriesStore.getLoadingStatus(),
    initialized: StoriesStore.getInitializedState()
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
    var page = this.getQuery().p || 1;
    this.setState(getStateFromStores(page));
  },
  getInitialState: function() {
    var page = this.getQuery().p || 1;
    return getStateFromStores(page);
  },
  handleClick: function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
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
      var page = parseInt(this.getQuery().p) || 1;
      var index = (30 * (page-1)) + 1;
      var nextPage = page + 1;

      if(this.state.jobs.length === 30) {
        var link = <Link to="jobs" query={{ p: nextPage }} onClick={this.handleClick}>More</Link>;
      }

      var renderedHTML = (
        <div>
          <h3 className="job-header">All the jobs listed here are at startups that were at some point funded by Y Combinator. Some are now established companies. Others may be only a few weeks old.</h3>
          <ol className="stories" start={index}>
          {jobs}
          </ol>
          <div className="more-link">
          {link}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="main">
        {renderedHTML}
        </div>
        <SpacerComponent />
        <FooterComponent />
      </div>
    )
  }

});

module.exports = JobsComponent;