var React = require('react');
var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;

var parseUrl = function(url) {
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

    var comhead = "";
    if(this.props.story.url) {
      comhead = parseUrl(this.props.story.url);
    }

    var comments = 0;

    if( this.props.story.children && this.props.story.children.length > 0 ) {
      comments = JSON.stringify(this.props.story.children).match(/:"comment"/g).length
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

    var time = moment(this.props.story.created_at_i * 1000).fromNow();

    var UserLink = <Link to="user" className="story-link" query={{ id: this.props.story.author }}>{this.props.story.author}</Link>;

    var ItemLink = <Link to="item" className="story-link" query={{ id: this.props.story.id }}>{commentsLabel}</Link>;

    var StoryLink = <a href={ this.props.story.url }>{this.props.story.title}</a>;

    return (
      <div className='story-wrapper'>
        <div className='story-title'>
          {StoryLink}
          <span className='comhead'> {comhead} </span>
        </div>
        <div className='story-subtext'>
          <span>{pointsLabel}</span> by {UserLink} {time} | {ItemLink}
        </div>
      </div>
    )
  }
});

module.exports = StoryComponent;