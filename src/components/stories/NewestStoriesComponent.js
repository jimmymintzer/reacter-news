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

var _ = require('../../utils/UnderscoreDebounce');

function getStateFromStores(page) {
  return {
    stories: StoriesStore.getStoriesByPageAndSortedTime(page),
    loading: StoriesStore.getLoadingStatus(),
    initialized: StoriesStore.getInitializedState(),
    comments: CommentsStore.getAllComments()
  };
}

var NewestStoriesComponent = React.createClass({
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
    document.title = "New Links | Reacter News";
    var stories = [];

    this.state.stories.forEach(function(story, index) {
      var commentByStoryId = [];
      this.state.comments.forEach(function(comment) {
        if(comment.parentId === story.id) {
          commentByStoryId.push(comment);
        }
      });
      var storyComponent = (
        <li key={index}>
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
      var page = parseInt(this.getQuery().p);
      var link = null;
      var index = 1;

      if(page < 2 || !page) {
        index = 1;
        link = <Link to="newest" query={{ p: 2 }} onClick={this.handleClick}>More</Link>;
      }
      else if(page >= 4) {
        index = 91;
      }
      else {
        index = 30 * (page-1) + 1;
        var nextPage = 1 + page;
        link = <Link to="newest" query={{ p: nextPage }} onClick={this.handleClick}>More</Link>;
      }
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

module.exports = NewestStoriesComponent;