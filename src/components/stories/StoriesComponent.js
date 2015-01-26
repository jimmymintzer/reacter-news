var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var StoriesCommentsMixin = require('../../mixins/StoriesCommentsMixin');
var GetTopStoriesAndCommentsMixin = require('../../mixins/GetTopStoriesAndCommentsMixin');

var StoryComponent = require('./../common/StoryComponent');
var CommentsStore = require('../../stores/CommentsStore');
var StoriesStore = require('../../stores/StoriesStore');
var LoaderComponent = require('../common/LoaderComponent');
var SpacerComponent = require('./../common/SpacerComponent');
var FooterComponent = require('./../common/FooterComponent');

var _  = require('../../utils/UnderscoreDebounce');

function getStateFromStores(page) {
  return {
    stories: StoriesStore.getStoriesByPage(page),
    loading: StoriesStore.getLoadingStatus(),
    initialized: StoriesStore.getInitializedState(),
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
  mixins: [Router.State, StoriesCommentsMixin, GetTopStoriesAndCommentsMixin],
  _setState: function() {
    if(this.isMounted()) {
      var page = this.getQuery().p || 1;
      this.setState(getStateFromStores(page));
    }
  },
  getInitialState: function() {
    var page = this.getQuery().p || 1;
    return getStateFromStores(page);
  },
  handleClick: function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  render: function() {
    document.title = "Reacter News";
    var stories = [];

    this.state.stories.forEach(function(story) {
      var commentByStoryId = [];
      this.state.comments.forEach(function(comment) {
        if(comment.parentId === story.id) {
          commentByStoryId.push(comment);
        }
      });
      var storyComponent = (
        <li key={story.id}>
          <StoryComponent story={story} numberOfComments={commentByStoryId.length}/>
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
      var page = parseInt(this.getQuery().p) || 1;
      var index = (30 * (page-1)) + 1;
      var nextPage = page + 1;

      if(this.state.stories.length === 30) {
        var link = <Link to="news" query={{ p: nextPage }} onClick={this.handleClick}>More</Link>;
      }

      var renderedHTML = (
        <div>
          <ol className="stories" start={index}>
          {stories}
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

module.exports = StoriesComponent;