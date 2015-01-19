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

function getStateFromStores(page) {
  return {
    stories: StoriesStore.getStoriesByPage(page),
    loading: StoriesStore.getLoadingStatus(),
    initialized: StoriesStore.getInitalizedState(),
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
  mixins: [Router.State, StoriesCommentsMixin],
  statics: {
    willTransitionTo: function() {
      ReacterNewsWebAPIUtils.getTopStoriesAndComments();
    }
  },
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

      if(page < 2 || !page) {
        index = 1;
        link = <Link to="news" query={{ p: 2 }} onClick={this.handleClick}>More</Link>;
      }
      else if(page >= 4) {
        index = 91;
      }
      else {
        index = 30 * (page-1) + 1;
        var nextPage = 1 + page;
        link = <Link to="news" query={{ p: nextPage }} onClick={this.handleClick}>More</Link>;
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