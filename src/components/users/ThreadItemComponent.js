var React = require('react');
var CommentsComponent = require('../comments/CommentsComponent');
var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;

var ThreadItemComponent = React.createClass({
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
    var commentByStoryId = this.props.commentValues.get(this.props.comment.parent) || new Map();

    var time = moment.unix(this.props.comment.time).fromNow();

    var author = this.props.comment.by;

    var ellipsisTitle = (this.props.parent.title.length >= 50) ? this.props.parent.title.substring(0, 50) + " ..." : this.props.parent.title;

    var UserLink = <Link to="user" className="story-link" query={{ id: author }}>{author}</Link>;

    var ItemLink = <Link to="item" className="story-link" query={{ id: this.props.comment.id }}>link</Link>;

    var StoryLink = <Link to="item" className="story-link" query={{ id: this.props.parent.id }}>{ellipsisTitle}</Link>;

    var ParentLink = <Link to="item" className="story-link" query={{ id: this.props.parent.id }}>parent</Link>;

    var storyText = <div dangerouslySetInnerHTML={{__html: this.props.comment.text}} />;


    return (
      <div className='thread-wrapper'>
        <div className='comhead'>
        {UserLink} {time} | {ItemLink} | {ParentLink} | on: {StoryLink}
        </div>
        <div className="thread-text">
        {storyText}
        </div>
        <CommentsComponent comments={this.props.comment.kids} commentsValue={commentByStoryId}/>
      </div>
    )

  }
});

module.exports = ThreadItemComponent;