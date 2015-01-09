var React = require('react');
var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;


var CommentComponent = React.createClass({
  render: function(){
    var comment = this.props.comment;
    var time = moment.unix(comment.time).fromNow();
    var ItemLink = <Link to="item" className="story-link" query={{ id: comment.id }}>Link</Link>;
    var UserLink = <Link to="user" className="story-link" query={{ id: comment.by }}>{comment.by}</Link>;

    if(!comment.text) {
      return null;
    }
    return (
      <div className="comment">
        <div className="username-row">{UserLink} {time} | {ItemLink}</div>
        <div dangerouslySetInnerHTML={{__html: comment.text}} />
        <CommentsComponent comments={comment.kids} commentsValue={this.props.commentsValue}/>
      </div>
    );
  }
});

var CommentsComponent = React.createClass({
  render: function(){
    var commentsArr = [];
    var comments = this.props.comments;
    var commentsValue = this.props.commentsValue;

    if(comments && comments.length > 0) {
      commentsArr = comments.map(function(comment) {
        var commentStr = parseInt(comment);
        var fullComment = commentsValue.get(commentStr) || comment;
        return <CommentComponent key={comment} comment={fullComment} commentsValue={this.props.commentsValue}/>
      }.bind(this));
    }
    return (
      <div className="comment-wrapper">
      {commentsArr}
      </div>
    );
  }
});


module.exports = CommentsComponent;