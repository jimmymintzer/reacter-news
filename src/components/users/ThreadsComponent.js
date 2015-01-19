var React = require('react');
var Router = require('react-router');
var StoriesCommentsMixin = require('../../mixins/StoriesCommentsMixin');
var GetTopStoriesAndCommentsMixin = require('../../mixins/GetTopStoriesAndCommentsMixin');
var CommentsStore = require('../../stores/CommentsStore');
var StoriesStore = require('../../stores/StoriesStore');
var ThreadItemComponent = require('./ThreadItemComponent');
var SpacerComponent = require('../common/SpacerComponent');
var FooterComponent = require('../common/FooterComponent');

var _ = require('../../utils/UnderscoreDebounce');
var Link = Router.Link;

function getStateFromStores(user) {
  return {
    stories: StoriesStore.getAllStories(),
    comments: CommentsStore.getCommentsByUser(user),
    commentValues: CommentsStore.getAllComments()
  };
}

var ThreadsComponent = React.createClass({
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

    var comments = this.state.comments.map(function(comment) {
      var parentStory = this.state.stories.filter(function(story) {
        return story.id === comment.parent;
      });
      return (
        <div key={comment.comment.id}>
          <ThreadItemComponent comment={comment.comment} parent={parentStory[0]} commentValues={this.state.commentValues} />
        </div>
      );

    }, this);

    return (
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


});

module.exports = ThreadsComponent;