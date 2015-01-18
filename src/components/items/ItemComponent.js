var React = require('react');
var Router = require('react-router');
var ReacterNewsWebAPIUtils = require('../../utils/ReacterNewsWebAPIUtils');
var CommentsStore = require('../../stores/CommentsStore');
var StoriesStore = require('../../stores/StoriesStore');
var PollStore = require('../../stores/PollStore');
var StoryComponent = require('../stories/StoryComponent');
var CommentsComponent = require('../comments/CommentsComponent');
var SpacerComponent = require('../common/SpacerComponent');
var FooterComponent = require('../common/FooterComponent');

var _ = require('../../utils/UnderscoreDebounce');
var moment = require('moment');
var Link = Router.Link;

function getStateFromStores(id) {
  return {
    item: StoriesStore.getStory(id),
    comment: CommentsStore.getCommentById(id),
    polls: PollStore.getAllPolls()
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
    StoriesStore.addChangeListener(this._onChange);
    CommentsStore.addChangeListener(this._onChange);
    PollStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    StoriesStore.removeChangeListener(this._onChange);
    CommentsStore.removeChangeListener(this._onChange);
    PollStore.removeChangeListener(this._onChange);
  },
  render: function() {

    var commentByStoryId = this.state.comment || new Map();

    if(Object.keys(this.state.item).length === 0 ) {
      var renderedHTML = (
        <div className="spinner-center">
          <i className="fa fa-refresh fa-spin"></i>
        </div>
      );
    }
    else {
      if(this.state.item.type === "poll") {
        var pollsValue = this.state.item.parts.map(function(part, index) {
          var poll = this.state.polls.get(part) || {};
          var pollText = poll.text || "";
          var pollScore = poll.score || 0;

          var pollLabel = pollScore + " ";

          pollLabel += (poll.score === 1) ? "point" : "points";

          return (
            <tr key={index}>
              <tr><td>{pollText}</td></tr>
              <tr><td className="comhead">{pollLabel}</td></tr>
            </tr>
          );
        }, this);

        var polls = (
          <table className="poll-wrapper">
          {pollsValue}
          </table>
        )
      }

      var renderedHTML = (
        <div>
          <StoryComponent story={this.state.item} numberOfComments={commentByStoryId.size}/>
          {polls}
          <CommentsComponent comments={this.state.item.kids} commentsValue={commentByStoryId}/>
        </div>
      );

    }


    if(this.state.item.type === "comment") {

      var comment = this.state.item;
      var time = moment.unix(comment.time).fromNow();
      var ItemLink = <Link to="item" className="story-link" query={{ id: comment.id }}>Link</Link>;
      var UserLink = <Link to="user" className="story-link" query={{ id: comment.by }}>{comment.by}</Link>;

      document.title = comment.text.replace(/<[^>]*>/g, '').replace(/&#x27;/g, "'") + " | Reacter News";

      return (
        <div className="item-wrapper">
          <div className="comment-wrapper">
            <div className="username-row no-padding">{UserLink} {time} | {ItemLink}</div>
            <div dangerouslySetInnerHTML={{__html: comment.text}} />
            <CommentsComponent comments={this.state.item.kids} commentsValue={commentByStoryId} />
          </div>
          <div className="spacer-padding"></div>
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
        {renderedHTML}
          <div className="spacer-padding"></div>
          <SpacerComponent />
          <FooterComponent />
        </div>
      );
    }

  },
  /**
   * Event handler for 'change' events coming from StoriesStore
   */
  _onChange: _.debounce(function () {
    this._setState();
  }, 75),

  _setState: function() {
    if(this.isMounted()) {
      var id = this.getQuery().id;
      if(this.isMounted()) {
        this.setState(getStateFromStores(id));
      }
    }
  }
});

module.exports = ItemComponent;