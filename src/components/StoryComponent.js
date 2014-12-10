var React = require('react');
var moment = require('moment');

var StoryComponent = React.createClass({
  render: function() {
    var pointsLabel = (this.props.story.score === 1) ? 'point' : 'points';
    var commentsLabel = (this.props.numberOfComments === 1) ? 'comment' : 'comments';
    var userHref= 'user?id=' + this.props.user;
    var itemHref = 'item?id=' + this.props.story.id;
    var comhead = this.props.story.url
      // TODO: Add http reg ex
      .replace('http://','')
      .replace('https://','')
      .replace(/www\./,'')
      .replace(/\.com.*$/, '.com')
      .replace(/\.me.*$/, '.me')
      .replace(/\.net.*$/, '.net')
      .replace(/\.org.*$/, '.org')
      .replace(/\.mil.*$/, '.mil')
      .replace(/\.edu.*$/, '.edu')
      .replace(/\.de.*$/, '.de')
      .replace(/\.co(?!m|\.za).*$/, '.co')
      .replace(/\.co\.za.*$/, '.co.za')
      .replace(/\.co\.uk.*$/, '.co.uk')
      .replace(/\.gov.*$/, '.gov')
      .replace(/\.cc.*$/, '.cc')
      .replace(/\.us.*$/, '.us')
      .replace(/\.io.*$/, '.io');
    comhead = comhead ? '('+comhead+')' : '';

    var comments = this.props.story.kids.length;

    var time = moment(this.props.story.time * 1000).fromNow();

    return (
      <div className='story-wrapper'>
        <div className='story-title'>
          <a href={this.props.story.url}>{this.props.story.title}</a>
          <span className='comhead'> {comhead} </span>
        </div>
        <div className='story-subtext'>
          <span>{this.props.story.score} {pointsLabel}</span> by <a href={userHref}>{this.props.story.by}</a> {time} | <a href={itemHref}>{comments} {commentsLabel}</a>
        </div>
      </div>
    )
  }
});

module.exports = StoryComponent;