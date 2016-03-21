var React = require('react');
var Router = require('react-router');
var StoriesStore = require('../../stores/ItemsStore');
var CommentItemComponent = require('./CommentItemComponent');
var LoaderComponent = require('../LoaderComponent');
var SpacerComponent = require('../SpacerComponent');
var FooterComponent = require('../FooterComponent');
var Link = Router.Link;
var APIUtils = require('../../utils/ReacterNewsWebAPIUtils');

function getStateFromStores() {
  return {
    stories: StoriesStore.getAllStories(),
    loading: StoriesStore.getLoadingStatus(),
    initialized: StoriesStore.getInitializedState(),
    comments: CommentsStore.getCommentsByDate()
  };
}

var CommentsStoriesComponent = React.createClass({
  componentDidMount: function() {
    StoriesStore.addChangeListener(this._onChange);
    CommentsStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    StoriesStore.removeChangeListener(this._onChange);
    CommentsStore.removeChangeListener(this._onChange);
    APIUtils.getTopStoriesAndComments();
  },
  _onChange: function() {
    this._setState();
  },
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
      var comments = this.state.comments.toArray().map(function( comment, index ) {
        var parentStory = this.state.stories.filter(function( story ) {
          return story.id === comment.parentId;
        });
        return (
          <div key={index}>
            <CommentItemComponent comment={comment} parent={parentStory.get(0)} />
          </div>
        );

      }, this);

      var renderedHTML = (
        <div className='item-wrapper'>
          <div className='comment-wrapper'>
        {comments}
          </div>
          <div className='spacer-padding'></div>
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
