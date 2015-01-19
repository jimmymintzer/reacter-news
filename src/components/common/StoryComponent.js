var React = require('react');
var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;

var buildComhead = function(url) {
  if(!url) {
    return "";
  }
  var comhead = url
    .replace(/^(http|https):\/\//,'')
    .replace(/www\./,'')
    .replace(/\.com.*$/, '.com')
    .replace(/\.me.*$/, '.me')
    .replace(/\.net.*$/, '.net')
    .replace(/\.org.*$/, '.org')
    .replace(/\.mil.*$/, '.mil')
    .replace(/\.edu.*$/, '.edu')
    .replace(/\.de.*$/, '.de')
    .replace(/\.ca.*$/, '.ca')
    .replace(/\.co(?!m|\.za).*$/, '.co')
    .replace(/\.co\.za.*$/, '.co.za')
    .replace(/\.co\.uk.*$/, '.co.uk')
    .replace(/\.gov.*$/, '.gov')
    .replace(/\.cc.*$/, '.cc')
    .replace(/\.us.*$/, '.us')
    .replace(/\.io.*$/, '.io')
    .replace(/\.int.*$/, '.int')
    .replace(/\.info.*$/, '.info')
    .replace(/\.fr.*$/, '.fr')
    .replace(/\.nl.*$/, '.nl')
    .replace(/\.ai.*$/, '.ai')
    .replace(/\.nu.*$/, '.nu')
    .replace(/\.cl.*$/, '.cl');
  comhead = comhead ? '('+comhead+')' : '';
  return comhead;
};

var buildPoints = function(points) {
  var pointsLabel = points + " point";

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
  getDefaultProps: function() {
    return {
      story: {
        by: '',
        id: 0,
        kids: [],
        score: 0,
        text: '',
        time: new Date(),
        title: '',
        type: '',
        url: ''
      },
      numberOfComments: 0
    };
  },
  render: function() {

    var pointsLabel = buildPoints(this.props.story.score);

    var commentsLabel = buildComments(this.props.numberOfComments);

    var comhead = buildComhead(this.props.story.url);

    var time = moment.unix(this.props.story.time).fromNow();

    var author = this.props.story.by;

    var UserLink = <Link to="user" className="story-link" query={{ id: author }}>{author}</Link>;

    var ItemLink = <Link to="item" className="story-link" query={{ id: this.props.story.id }}>{commentsLabel}</Link>;

    var StoryLink = <a href={ this.props.story.url }>{this.props.story.title}</a>;

    if(this.props.story.type !== "job") {
      subtext =  (
        <div className='story-subtext'>
          <span>{pointsLabel}</span> by {UserLink} {time} | {ItemLink}
        </div>
      )
    }
    else {
      var subtext = (
        <div className='story-subtext'>
          {time}
        </div>
      )
    }

    return (
      <div className='story-wrapper'>
        <div className='story-title'>
          {StoryLink}
          <span className='comhead'> {comhead} </span>
        </div>
        {subtext}
      </div>
    )

  }
});

module.exports = StoryComponent;