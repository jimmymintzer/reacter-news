var React = require('react');
var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;


var CommentComponent = React.createClass({
  render: function(){
    var comment = this.props.comment;
    var time = moment(comment.created_at_i * 1000).fromNow();
    var ItemLink = <Link to="item" className="story-link" query={{ id: comment.id }}>Link</Link>;
    var UserLink = <Link to="user" className="story-link" query={{ id: comment.author }}>{comment.author}</Link>;

    if(!comment.text) {
      return null;
    }
    return (
      <div className="comment">
        <div className="username-row">{UserLink} {time} | {ItemLink}</div>
        <div dangerouslySetInnerHTML={{__html: comment.text}} />
        <CommentsComponent comments={comment.children} />
      </div>
    );
  }
});

var CommentsComponent = React.createClass({
  render: function(){
    var commentsArr = [];
    var comments = this.props.comments;

    if(comments && comments.length > 0) {
      commentsArr = comments.map(function(comment) {
        return <CommentComponent key={comment.id} comment={comment} />
      });
    }
    return (
      <div className="comment-wrapper">
      {commentsArr}
      </div>
    );
  }
});


module.exports = CommentsComponent;