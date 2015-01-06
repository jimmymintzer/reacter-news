var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var StoryComponent = require('./StoryComponent');
var CommentsStore = require('../../stores/CommentsStore');
var TopStoriesStore = require('../../stores/TopStoriesStore');
var ReacterNewsWebAPIUtils = require('../../utils/ReacterNewsWebAPIUtils');
var SpacerComponent = require('./../common/SpacerComponent');
var FooterComponent = require('./../common/FooterComponent');

var _  = require('../../utils/UnderscoreDebounce');


function getStateFromStores() {
  return {
    stories: TopStoriesStore.getTopStories(),
    comments: CommentsStore.getAllComments()
  };
}

var StoriesComponent = React.createClass({
  getDefaultProps: function () {
    return {
      stories: [],
      comments: []
    }
  },
  mixins: [Router.State],
  statics: {
    willTransitionTo: function(transition, params, query) {
      ReacterNewsWebAPIUtils.getTopStoriesAndComments();
    }
  },
  getInitialState: function() {
    return getStateFromStores();
  },
  componentDidMount: function() {
    TopStoriesStore.addChangeListener(this._onChange);
    CommentsStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    TopStoriesStore.removeChangeListener(this._onChange);
    CommentsStore.removeChangeListener(this._onChange);
  },
  handleClick: function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  render: function() {

    document.title = "Reacter News";

    var stories = this.state.stories.map(function(story, index) {
      return (
        <li key={index}>
          <StoryComponent story={story} comments={this.state.comments[story.id]}/>
        </li>
      );
    }.bind(this));

    if(this.state.stories.length === 0 ) {
      var renderedHTML = (
        <div className="spinner-center">
          <i className="fa fa-refresh fa-spin"></i>
        </div>
      );
    }
    else {
      var link = <Link to="news" query={{ p: 2 }} onClick={this.handleClick}>More</Link>;
    }

    return (
      <div>
        <div className="main">
        {renderedHTML}
          <ol className="stories" start={1}>
          {stories}
          </ol>
          <div className="more-link">
          {link}
          </div>
        </div>
        <SpacerComponent />
        <FooterComponent />
      </div>
    )
  },
  _onChange: _.debounce(function () {
    this._setState();
  }, 500),

  _setState: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = StoriesComponent;