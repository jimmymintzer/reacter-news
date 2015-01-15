var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var StoryComponent = require('../stories/StoryComponent');
var TopStoriesStore = require('../../stores/TopStoriesStore');
var ReacterNewsWebAPIUtils = require('../../utils/ReacterNewsWebAPIUtils');
var SpacerComponent = require('./../common/SpacerComponent');
var FooterComponent = require('./../common/FooterComponent');


function getStateFromStores() {
  return {
    jobs: TopStoriesStore.getJobsStories()
  };
}

var StoriesComponent = React.createClass({
  getDefaultProps: function () {
    return {
      jobs: []
    }
  },
  mixins: [Router.State],
  statics: {
    willTransitionTo: function(transition, params, query) {
      ReacterNewsWebAPIUtils.getTopStoriesAndComments();
    }
  },
  getInitialState: function() {
    return getStateFromStores("all");
  },
  componentDidMount: function() {
    TopStoriesStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    TopStoriesStore.removeChangeListener(this._onChange);
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

    if(this.state.jobs.length < 1 ) {
      var renderedHTML = (
        <div className="spinner-center">
          <i className="fa fa-refresh fa-spin"></i>
        </div>
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
  },
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = StoriesComponent;