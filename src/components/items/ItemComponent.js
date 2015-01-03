var React = require('react');
var Router = require('react-router');
var ReacterNewsWebAPIUtils = require('../../utils/ReacterNewsWebAPIUtils');
var TopStoriesStore = require('../../stores/StoriesStore');
var StoryComponent = require('../stories/StoryComponent');
var CommentsComponent = require('../comments/CommentsComponent');
var SpacerComponent = require('../common/SpacerComponent');
var FooterComponent = require('../common/FooterComponent');

var moment = require('moment');
var Link = Router.Link;

function getStateFromStores(id) {
  return {
    item: TopStoriesStore.get(id)
  };
}

var ItemComponent = React.createClass({
  mixins: [Router.State],
  statics :{
    willTransitionTo: function(transition, params, query) {
      var id = query.id || '';
      ReacterNewsWebAPIUtils.getStory(id);
    }
  },
  getInitialState: function() {
    var id = this.getQuery().id;
    return getStateFromStores(id);
  },
  componentDidMount: function() {
    TopStoriesStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    TopStoriesStore.removeChangeListener(this._onChange);
  },
  render: function() {
    if(this.state.item.type === "comment") {

      var comment = this.state.item;
      var time = moment(comment.created_at_i * 1000).fromNow();
      var ItemLink = <Link to="item" className="story-link" query={{ id: comment.id }}>Link</Link>;
      var UserLink = <Link to="user" className="story-link" query={{ id: comment.author }}>{comment.author}</Link>;

      document.title = comment.text.replace(/<[^>]*>/g, '').replace(/&#x27;/g, "'") + " | Reacter News";
      return (
        <div className="item-wrapper">
          <div className="comment-wrapper">
            <div className="username-row">{UserLink} {time} | {ItemLink}</div>
            <div dangerouslySetInnerHTML={{__html: comment.text}} />
            <CommentsComponent comments={this.state.item.children} />
          </div>

          <SpacerComponent />
          <FooterComponent />
        </div>
      );
    }
    else {
      var stateTitle = this.state.item.title ? this.state.item.title + " | ": "";
      document.title = stateTitle +  "Reacter News";
      return (
        <div className="item-wrapper">
          <StoryComponent story={this.state.item} />
          <CommentsComponent comments={this.state.item.children} />
          <SpacerComponent />
          <FooterComponent />
        </div>
      );
    }

  },
  /**
   * Event handler for 'change' events coming from TopStoriesStore
   */
  _onChange: function() {
    var id = this.getQuery().id;
    this.setState(getStateFromStores(id));
  }
});

module.exports = ItemComponent;