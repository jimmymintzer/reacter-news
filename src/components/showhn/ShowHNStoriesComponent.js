var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var StoryComponent = require('./../common/StoryComponent');
var CommentsStore = require('../../stores/CommentsStore');
var StoriesStore = require('../../stores/StoriesStore');
var ReacterNewsWebAPIUtils = require('../../utils/ReacterNewsWebAPIUtils');
var LoaderComponent = require('../common/LoaderComponent');
var SpacerComponent = require('./../common/SpacerComponent');
var FooterComponent = require('./../common/FooterComponent');

var _  = require('../../utils/UnderscoreDebounce');

function getStateFromStores(page) {
  return {
    stories: StoriesStore.getShowHNStories(page),
    loading: StoriesStore.getLoadingStatus(),
    initialized: StoriesStore.getInitalizedState(),
    comments: CommentsStore.getAllComments()
  };
}

var ShowHNStoriesComponent = React.createClass({
  getDefaultProps: function () {
    return {
      stories: [],
      comments: new Map()
    }
  },
  mixins: [Router.State],
  statics: {
    willTransitionTo: function(transition, params, query) {
      ReacterNewsWebAPIUtils.getTopStoriesAndComments();
    }
  },
  getInitialState: function() {
    var page = this.getQuery().p || 1;
    return getStateFromStores(page);
  },
  componentDidMount: function() {
    StoriesStore.addChangeListener(this._onChange);
    CommentsStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    StoriesStore.removeChangeListener(this._onChange);
    CommentsStore.removeChangeListener(this._onChange);
  },
  render: function() {
    document.title = "Ask | Reacter News";
    var stories = [];

    this.state.stories.forEach(function(story) {
      var commentByStoryId = this.state.comments.get(story.id) || new Map();
      var storyComponent = (
        <li key={story.id + "shn"}>
          <StoryComponent story={story} numberOfComments={commentByStoryId.size}/>
        </li>
      );
      stories.push(storyComponent);

    }, this);

    if(this.state.loading && !this.state.initialized) {
      var renderedHTML = (
        <LoaderComponent />
      );
    }
    else {
      var renderedHTML = (
        <div>
          <h3 className="show-header">Please read the <a href="https://news.ycombinator.com/showhn.html" target="_blank">
          <u>guidelines</u></a>. The newest Show HNs are <Link to="shownew"><u>here</u></Link>.</h3>
          <ol className="stories" start={1}>
          {stories}
          </ol>
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
  },
  _onChange: _.debounce(function () {
    this._setState();
  }, 75),

  _setState: function() {
    /*
     The comments are loaded recursively, which freeze the browser because the updates come in too fast.
     */
    if(this.isMounted()) {
      var page = this.getQuery().p || 1;
      this.setState(getStateFromStores(page));
    }
  }

});

module.exports = ShowHNStoriesComponent;