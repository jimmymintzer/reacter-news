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

function getStateFromStores(user) {
  return {
    stories: TopStoriesStore.getSubmittedStories(user),
    comments: CommentsStore.getAllComments()
  };
}

var StoriesComponent = React.createClass({
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
    var user = this.getQuery().id || 1;
    return getStateFromStores(user);
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
    var stories = [];

    this.state.stories.forEach(function(story) {
      var commentByStoryId = this.state.comments.get(story.id) || new Map();
      var storyComponent = (
        <li key={story.id}>
          <StoryComponent story={story} numberOfComments={commentByStoryId.size}/>
        </li>
      );
      stories.push(storyComponent);

    }, this);

    if(this.state.stories.length < 1 ) {
      var renderedHTML = (
        <div className="spinner-center">
          <i className="fa fa-refresh fa-spin"></i>
        </div>
      );
    }
    else {
      var page = parseInt(this.getQuery().p);
      var link = null;
      var index = 1;

      //if(page < 2 || !page) {
      //  index = 1;
      //  link = <Link to="news" query={{ p: 2 }} onClick={this.handleClick}>More</Link>;
      //}
      //else if(page >= 4) {
      //  index = 91;
      //}
      //else {
      //  index = 30 * (page-1) + 1;
      //  var nextPage = 1 + page;
      //  link = <Link to="news" query={{ p: nextPage }} onClick={this.handleClick}>More</Link>;
      //}
    }

    return (
      <div>
        <div className="main">
        {renderedHTML}
          <ol className="stories" start={index}>
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
  }, 75),

  _setState: function() {
    /*
     The comments are loaded recursively, which freeze the browser because the updates come in too fast.
     */
    if(this.isMounted()) {
      var user = this.getQuery().id || 1;
      this.setState(getStateFromStores(user));
    }
  }

});

module.exports = StoriesComponent;