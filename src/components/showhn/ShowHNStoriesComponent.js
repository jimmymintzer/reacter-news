var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var StoriesCommentsMixin = require('../../mixins/StoriesCommentsMixin');
var GetTopStoriesAndCommentsMixin = require('../../mixins/GetTopStoriesAndCommentsMixin');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var StoryComponent = require('./../common/StoryComponent');
var CommentsStore = require('../../stores/CommentsStore');
var StoriesStore = require('../../stores/StoriesStore');
var LoaderComponent = require('../common/LoaderComponent');
var SpacerComponent = require('./../common/SpacerComponent');
var FooterComponent = require('./../common/FooterComponent');

var _  = require('../../utils/UnderscoreDebounce');

function getStateFromStores(page) {
  return {
    stories: StoriesStore.getShowHNStories(page),
    loading: StoriesStore.getLoadingStatus(),
    initialized: StoriesStore.getInitializedState(),
    comments: CommentsStore.getAllComments()
  };
}

var ShowHNStoriesComponent = React.createClass({
  mixins: [Router.State, StoriesCommentsMixin, GetTopStoriesAndCommentsMixin, PureRenderMixin],
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
  render: function() {
    document.title = "Ask | Reacter News";
    var stories = this.state.stories.map((story, index) => {
      var commentByStoryId = this.state.comments.filter(comment => {
        if(comment.parentId === story.id) {
          return comment;
        }
      });
      return (
        <li key={index}>
          <StoryComponent story={story} numberOfComments={commentByStoryId.size}/>
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

      var link = (this.state.stories.size === 30) ?
        <Link to="show" query={{ p: nextPage }} onClick={this.handleClick}>More</Link>
        : null;

      var renderedHTML = (
        <div>
          <h3 className="show-header">Please read the <a href="https://news.ycombinator.com/showhn.html" target="_blank">
          <u>guidelines</u></a>. The newest Show HNs are <Link to="shownew"><u>here</u></Link>.</h3>
          <ol className="stories" start={index}>
          {stories.toArray()}
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

module.exports = ShowHNStoriesComponent;