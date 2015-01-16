var React = require('react');
var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;

moment.fn.minutesFromNow = function() {
  var r = Math.floor((+new Date() - (+this))/60000);
  return r + ' min' + ((r===1) ? '' : 's') + ' ago';
};

var CommentItemComponent = React.createClass({
  getDefaultProps: function() {
    return {
      comment: {
        by: '',
        id: 0,
        kids: [],
        parent: '',
        text: '',
        time: new Date(),
        type: ''
      }
    };
  },
  render: function() {

    var time = moment.unix(this.props.comment.time).minutesFromNow();

    var author = this.props.comment.by;

    var ellipsisTitle = (this.props.parent.title.length >= 50) ? this.props.parent.title.substring(0, 50) : this.props.parent.title;
    ellipsisTitle += " ...";

    var UserLink = <Link to="user" className="story-link" query={{ id: author }}>{author}</Link>;

    var ItemLink = <Link to="item" className="story-link" query={{ id: this.props.comment.id }}>link</Link>;

    var StoryLink = <Link to="item" className="story-link" query={{ id: this.props.parent.id }}>{ellipsisTitle}</Link>;

    var ParentLink = <Link to="item" className="story-link" query={{ id: this.props.parent.id }}>parent</Link>;

    var storyText = <div dangerouslySetInnerHTML={{__html: this.props.comment.text}} />;


    return (
      <div className='story-wrapper'>
        <div className='comhead'>
        {UserLink} {time} | {ItemLink} | {ParentLink} | on: {StoryLink}
        </div>
        <div className="comment-text">
        {storyText}
        </div>
      </div>
    )

  }
});

module.exports = CommentItemComponent;