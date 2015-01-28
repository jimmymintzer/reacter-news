var React = require('react');
var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var CommentComponent = React.createClass({
  mixins: [PureRenderMixin],
  render: function(){
    var comment = this.props.comment;
    if(this.props.daysTime) {
      var a = moment();
      var b = moment(this.props.comment.time * 1000);
      var time = a.diff(b, 'days');
      if(time === 0) {
        var time = moment.unix(comment.time).fromNow();
      }
      else {
        var timeLabel = (time===1)? ' day' : ' days';
        var time = time + timeLabel + ' ago';
      }
    }
    else {
      var time = moment.unix(comment.time).fromNow();
    }

    var ItemLink = <Link to="item" className="story-link" query={{ id: comment.id }}>Link</Link>;
    var UserLink = <Link to="user" className="story-link" query={{ id: comment.by }}>{comment.by}</Link>;

    if(!comment.text) {
      return null;
    }
    return (
      <div className="comment">
        <div className="username-row">{UserLink} {time} | {ItemLink}</div>
        <div dangerouslySetInnerHTML={{__html: comment.text}} />
        <CommentsComponent comments={comment.kids} commentsValue={this.props.commentsValue}
          daysTime={this.props.daysTime}/>
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
  mixins: [PureRenderMixin],
  render: function(){
    var daysTime = this.props.daysTime;
    var commentsArr = this.props.comments.map((comment, index) => {
      var fullComment = this.props.commentsValue.get(comment) || comment;
      return <CommentComponent key={index} comment={fullComment} commentsValue={this.props.commentsValue} daysTime={this.props.daysTime} />
    });

    return (
      <div className="comment-wrapper">
      {commentsArr}
      </div>
    );
  }
});


module.exports = CommentsComponent;