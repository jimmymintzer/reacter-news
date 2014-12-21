var React = require('react');
var CommentComponent = require('./CommentComponent');

var CommentsComponent = React.createClass({
  render: function() {
    var commentArr;
    if(this.props.comments && this.props.comments.length > 0) {
      commentArr = this.props.comments.map(function(comment, index) {
        return (
          <CommentComponent key={index} comment={comment} />
        )
      })
    }
    return (
      <div className="comment-wrapper">{commentArr}</div>
    )
  }
});

module.exports = CommentsComponent;