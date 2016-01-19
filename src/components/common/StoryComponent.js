var React = require('react');
var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;
import Comhead from '../Comhead';
import TimeElement from '../TimeElement';

var buildPoints = function(points) {
  var pointsLabel = points + ' point';

  pointsLabel += (points !== 1) ? 's' : '';

  return pointsLabel;
};

var buildComments = function(count) {
  var commentsCount = count || 0;

  var commentsLabel;

  if( commentsCount === 0 ) {
    commentsLabel = 'discuss';
  }
  else if(commentsCount === 1) {
    commentsLabel = commentsCount + ' comment'
  }
  else {
    commentsLabel = commentsCount + ' comments';
  }

  return commentsLabel;
};

var StoryComponent = React.createClass({
  render: function() {

    var pointsLabel = buildPoints(this.props.story.score);

    var commentsLabel = buildComments(this.props.story.descendants);

    var author = this.props.story.by;

    var UserLink = <Link to='user' className='story-link' query={{ id: author }}>{author}</Link>;

    var ItemLink = <Link to='item' className='story-link' query={{ id: this.props.story.id }}>{commentsLabel}</Link>;

    var StoryLink = <a href={ this.props.story.url }>{this.props.story.title}</a>;

    if(this.props.story.type !== 'job') {
      subtext =  (
        <div className='story-subtext'>
          <span>{pointsLabel}</span> by {UserLink} <TimeElement time={this.props.story.time} /> | {ItemLink}
        </div>
      )
    }
    else {
      var subtext = (
        <div className='story-subtext'>
          <TimeElement time={this.props.story.time} />
        </div>
      )
    }

    return (
      <div className='story-wrapper'>
        <div className='story-title'>
          {StoryLink} <Comhead url={this.props.story.url} />
        </div>
        {subtext}
      </div>
    )

  }
});

module.exports = StoryComponent;
