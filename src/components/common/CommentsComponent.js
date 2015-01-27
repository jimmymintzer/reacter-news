var React = require('react');
var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;
var Immutable = require('immutable');


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
  getDefaultProps: function() {
    return {
      comments: [],
      commentsValue: []
    }
  },
  render: function(){
    var commentsArr = this.props.comments.map((comment, index) => {
      var fullComment = this.props.commentsValue.get(comment) || comment;
      return <CommentComponent key={index} comment={fullComment} commentsValue={this.props.commentsValue}/>
    });

    return (
      <div className="comment-wrapper">
      {commentsArr}
      </div>
    );
  }
});


module.exports = CommentsComponent;