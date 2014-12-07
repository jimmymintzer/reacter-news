var React = require('react');

var StoryComponent = React.createClass({
  render: function() {
    var pointsLabel = (this.props.points === 1) ? "point" : "points";
    var commentsLabel = (this.props.numberOfComments === 1) ? "comment" : "comments";
    var userHref= "user?id=" + this.props.user;
    var itemHref = "item?id=" + this.props.item;
    return (
      <div className="story-wrapper">
        <div className="story-title">
          <a href={this.props.href}>{this.props.title}</a>
          <span className="comhead"> ({this.props.comhead}) </span>
        </div>
        <div className="story-subtext">
          <span>{this.props.points} {pointsLabel}</span> by <a href={userHref}>{this.props.user}</a> {this.props.time}  | <a href={itemHref}>{this.props.numberOfComments} {commentsLabel}</a>
        </div>
      </div>
    )
  }
});

module.exports = StoryComponent;