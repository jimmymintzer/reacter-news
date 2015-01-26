var React = require('react');
var Router = require('react-router');
var StoriesCommentsMixin = require('../../mixins/StoriesCommentsMixin');
var GetTopStoriesAndCommentsMixin = require('../../mixins/GetTopStoriesAndCommentsMixin');
var CommentsStore = require('../../stores/CommentsStore');
var StoriesStore = require('../../stores/StoriesStore');
var CommentItemComponent = require('./CommentItemComponent');
var LoaderComponent = require('../common/LoaderComponent');
var SpacerComponent = require('../common/SpacerComponent');
var FooterComponent = require('../common/FooterComponent');

var _ = require('../../utils/UnderscoreDebounce');
var Link = Router.Link;

function getStateFromStores() {
  return {
    stories: StoriesStore.getAllStories(),
    loading: StoriesStore.getLoadingStatus(),
    initialized: StoriesStore.getInitializedState(),
    comments: CommentsStore.getCommentsByDate()
  };
}

var CommentsStoriesComponent = React.createClass({
  mixins: [Router.State, StoriesCommentsMixin, GetTopStoriesAndCommentsMixin],
  _setState: function() {
    if(this.isMounted()) {
      var id = this.getQuery().id;
      if(this.isMounted()) {
        this.setState(getStateFromStores(id));
      }
    }
  },
  getInitialState: function() {
    return getStateFromStores();
  },
  render: function() {

    if(this.state.loading && !this.state.initialized) {
      var renderedHTML = (
        <LoaderComponent />
      );
    }
    else {

      var comments = this.state.comments.map(function( comment, index ) {
        var parentStory = this.state.stories.filter(function( story ) {
          return story.id === comment.parentId;
        });
        return (
          <div key={index}>
            <CommentItemComponent comment={comment} parent={parentStory[0]} />
          </div>
        );

      }, this);

      var renderedHTML = (
        <div className="item-wrapper">
          <div className="comment-wrapper">
        {comments}
          </div>
          <div className="spacer-padding"></div>
          <SpacerComponent />
          <FooterComponent />
        </div>
      );
    }

    return (
      <div>
        {renderedHTML}
      </div>
    );

  }
});

module.exports = CommentsStoriesComponent;