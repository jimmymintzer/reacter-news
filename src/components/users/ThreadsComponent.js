var React = require('react');
var Router = require('react-router');
var CommentsStore = require('../../stores/CommentsStore');
var ThreadItemComponent = require('./ThreadItemComponent');
var SpacerComponent = require('../common/SpacerComponent');
var FooterComponent = require('../common/FooterComponent');
var LoaderComponent = require('../common/LoaderComponent');
var Link = Router.Link;
var APIUtils = require('../../utils/ReacterNewsWebAPIUtils');

function getStateFromStores(userId, page) {
  return {
    comments: CommentsStore.getCommentsByUser(userId, page),
    commentValues: CommentsStore.getAllComments(),
    loading: CommentsStore.getLoadingStatus()
  };
}

var ThreadsComponent = React.createClass({
  componentDidMount: function() {
    CommentsStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    CommentsStore.removeChangeListener(this._onChange);
    var userId = query.id || '';
    APIUtils.getUserComments(userId);
  },
  _onChange: function() {
    this._setState();
  },
  _setState: function() {
    if(this.isMounted()) {
      var userId = this.getQuery().id || '';
      var page = this.getQuery().p || 1;
      if(this.isMounted()) {
        this.setState(getStateFromStores(userId, page));
      }
    }
  },
  getInitialState: function() {
    var userId = this.getQuery().id || '';
    var page = this.getQuery().p || 1;
    return getStateFromStores(userId, page);
  },
  handleClick: function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  render: function() {
    var comments = this.state.comments.toArray().map(function(comment) {
      return (
        <div key={comment.id}>
          <ThreadItemComponent comment={comment} parent={comment.parentStoryDetails} commentValues={this.state.commentValues} />
        </div>
      );

    }, this);

    if(this.state.loading) {
      var renderedHTML = (
        <LoaderComponent />
      );
    }
    else {

      var page = parseInt(this.getQuery().p) || 1;
      var userId = this.getQuery().id || '';
      var nextPage = page + 1;
      if ( this.state.comments.size === 10 ) {
        var link = <Link to='threads' query={{id: userId, p: nextPage}} onClick={this.handleClick}>More</Link>;
      }

      var renderedHTML = (
        <div>
          <div className='comment-wrapper'>
          {comments}
          </div>
          <div className='more-link'>
          {link}
          </div>
        </div>
      );
    }

    return (
      <div className='item-wrapper'>
        {renderedHTML}
        <div className='spacer-padding'></div>
        <SpacerComponent />
        <FooterComponent />
      </div>
    );

  }


});

module.exports = ThreadsComponent;
