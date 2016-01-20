var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var StoryComponent = require('./../StoryComponent');
var StoriesStore = require('../../stores/StoriesStore');
var LoaderComponent = require('../LoaderComponent');
var SpacerComponent = require('./../SpacerComponent');
var FooterComponent = require('./../FooterComponent');
var APIUtils = require('../../utils/ReacterNewsWebAPIUtils');

function getStateFromStores(page) {
  return {
    jobs: StoriesStore.getJobsStories(page),
    loading: StoriesStore.getLoadingStatus(),
    initialized: StoriesStore.getInitializedState()
  };
}

var JobsComponent = React.createClass({
  componentDidMount: function() {
    StoriesStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    StoriesStore.removeChangeListener(this._onChange);

    APIUtils.getTopStoriesAndComments();

  },
  _onChange: function() {
    this._setState();
  },
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
    document.title = 'Jobs | Reacter News';
    var jobs = this.state.jobs.map((job, index) => {
      return (
        <li key={index}>
          <StoryComponent story={job} />
        </li>
      );
    });

    if(this.state.loading && !this.state.initialized) {
      var renderedHTML = <LoaderComponent />;
    }
    else {
      var page = parseInt(this.getQuery().p) || 1;
      var index = (30 * (page-1)) + 1;
      var nextPage = page + 1;

      var link = (this.state.jobs.size === 30) ?
        <Link to='jobs' query={{ p: nextPage }} onClick={this.handleClick}>More</Link>
        : null;

      var renderedHTML = (
        <div>
          <h3 className='job-header'>All the jobs listed here are at startups that were at some point funded by
            Y Combinator. Some are now established companies. Others may be only a few weeks old.</h3>
          <ol className='stories' start={index}>
          {jobs.toArray()}
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

module.exports = JobsComponent;
