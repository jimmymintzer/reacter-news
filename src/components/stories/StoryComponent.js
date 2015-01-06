var React = require('react');
var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;

var buildComhead = function(url) {
  if(!url) {
    return "";
  }
  var comhead = url
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
    .replace(/\.cl.*$/, '.cl');
  comhead = comhead ? '('+comhead+')' : '';
  return comhead;
};

var StoryComponent = React.createClass({
  render: function() {
    var pointsLabel = this.props.story.points + " point";
    if(this.props.story.points !== 1) {
      pointsLabel += 's';
    }

    var comhead = buildComhead(this.props.story.url);

    var comments = 0;

    if( this.props.story.children && this.props.story.children.length > 0 ) {
      var commentsStringify = JSON.stringify(this.props.story.children).match(/:"comment"/g);
      if(commentsStringify) {
        comments = commentsStringify.length;
      }
    }
    else {
      if(this.props.story.kids && this.props.story.kids ) {
        comments = this.props.story.kids.length;
      }
    }

    var commentsLabel;

    if( comments === 0 ) {
      commentsLabel = 'discuss';
    }
    else if(comments === 1) {
      commentsLabel = comments + ' comment'
    }
    else {
      commentsLabel = comments + ' comments';
    }

    var story_time = this.props.story.created_at_i || this.props.story.time;

    var time = moment(story_time * 1000).fromNow();

    var author = this.props.story.author || this.props.story.by;

    var UserLink = <Link to="user" className="story-link" query={{ id: author }}>{author}</Link>;

    var ItemLink = <Link to="item" className="story-link" query={{ id: this.props.story.id }}>{commentsLabel}</Link>;

    var StoryLink = <a href={ this.props.story.url }>{this.props.story.title}</a>;

    var subtext = null;

    if(this.props.story.type !== "job") {
      subtext =  (
        <div className='story-subtext'>
          <span>{pointsLabel}</span> by {UserLink} {time} | {ItemLink}
        </div>
      )
    }
    else {
      subtext = (
        <div className='story-subtext-padding'></div>
      )
    }

    if(!this.props.story.title) {
      return null;
    }
    else {
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

  }
});

module.exports = StoryComponent;