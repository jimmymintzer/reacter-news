var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var StoriesCommentsMixin = require('../../mixins/StoriesCommentsMixin');

var StoryComponent = require('./../common/StoryComponent');
var CommentsStore = require('../../stores/CommentsStore');
var StoriesStore = require('../../stores/StoriesStore');
var ReacterNewsWebAPIUtils = require('../../utils/ReacterNewsWebAPIUtils');
var LoaderComponent = require('../common/LoaderComponent');
var SpacerComponent = require('./../common/SpacerComponent');
var FooterComponent = require('./../common/FooterComponent');

var _  = require('../../utils/UnderscoreDebounce');

function getStateFromStores(user) {
  return {
    stories: StoriesStore.getSubmittedStories(user),
    loading: StoriesStore.getLoadingStatus(),
    initialized: StoriesStore.getInitalizedState(),
    comments: CommentsStore.getAllComments()
  };
}

var SubmittedComponent = React.createClass({
  getDefaultProps: function () {
    return {
      stories: [],
      comments: new Map()
    }
  },
  mixins: [Router.State, StoriesCommentsMixin],
  statics: {
    willTransitionTo: function() {
      ReacterNewsWebAPIUtils.getTopStoriesAndComments();
    }
  },
  _setState: function() {
    if(this.isMounted()) {
      var user = this.getQuery().id || 1;
      this.setState(getStateFromStores(user));
    }
  },
  getInitialState: function() {
    var user = this.getQuery().id || 1;
    return getStateFromStores(user);
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

    if(this.state.loading && !this.state.initialized) {
      var renderedHTML = (
        <LoaderComponent />
      );
    }
    else {
      var page = parseInt(this.getQuery().p);
      var link = null;
      var index = 1;

      // TODO: update more link
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
  }

});

module.exports = SubmittedComponent;