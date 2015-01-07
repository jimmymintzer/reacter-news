var React = require('react');
var Router = require('react-router');
var ReacterNewsWebAPIUtils = require('../../utils/ReacterNewsWebAPIUtils');
var CommentsStore = require('../../stores/CommentsStore');
var TopStoriesStore = require('../../stores/TopStoriesStore');
var StoryComponent = require('../stories/StoryComponent');
var CommentsComponent = require('../comments/CommentsComponent');
var SpacerComponent = require('../common/SpacerComponent');
var FooterComponent = require('../common/FooterComponent');

var _ = require('../../utils/UnderscoreDebounce');
var moment = require('moment');
var Link = Router.Link;

function getStateFromStores(id) {
  return {
    item: TopStoriesStore.getStory(id),
    comment: CommentsStore.getCommentById(id)
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
    CommentsStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    TopStoriesStore.removeChangeListener(this._onChange);
    CommentsStore.addChangeListener(this._onChange);
  },
  render: function() {

    if(this.state.item.length === 0 ) {
      var renderedHTML = (
        <div className="spinner-center">
          <i className="fa fa-refresh fa-spin"></i>
        </div>
      );
    }
    else {
      var renderedHTML = (
        <div>
          <StoryComponent story={this.state.item} comments={this.state.comment}/>
          <CommentsComponent comments={this.state.item.kids} commentsValue={this.state.comment}/>
        </div>
      )
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
            <CommentsComponent comments={this.state.item.kids} commentsValue={this.state.comment} />
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
   * Event handler for 'change' events coming from TopStoriesStore
   */
  //_onChange: function() {
  //  var id = this.getQuery().id;
  //  if(this.isMounted()) {
  //    this.setState(getStateFromStores(id));
  //  }
  //},
  _onChange: _.debounce(function () {
    this._setState();
  }, 100),

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