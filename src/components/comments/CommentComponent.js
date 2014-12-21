var React = require('react');
var CommentsComponent = require('./CommentsComponent');

var CommentComponent = React.createClass({
  render: function(){
    return (
      <div className="comment">
        <h5> {this.props.comment.id} says {this.props.comment.text}</h5>
        <CommentsComponent className="nested-comment" comments={this.props.comment.children} />
      </div>
    )
  }
});

module.exports = CommentComponent;