var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


var StoryComponent = require('./../StoryComponent');
var CommentsStore = require('../../stores/CommentsStore');
var StoriesStore = require('../../stores/ItemsStore');
var LoaderComponent = require('../LoaderComponent');
var SpacerComponent = require('./../SpacerComponent');
var FooterComponent = require('./../FooterComponent');
var APIUtils = require('../../utils/ReacterNewsWebAPIUtils');

function getStateFromStores(user) {
  return {
    stories: StoriesStore.getAllSubmittedStories(user),
    loading: StoriesStore.getSubmittedLoadingStatus(),
    comments: CommentsStore.getAllComments()
  };
}

var SubmittedComponent = React.createClass({
  componentDidMount: function() {
    StoriesStore.addChangeListener(this._onChange);
    CommentsStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    StoriesStore.removeChangeListener(this._onChange);
    CommentsStore.removeChangeListener(this._onChange);
    var id = query.id || 0;
    var p = query.p || 1;
    APIUtils.getUserSubmissions(id, p);
  },
  _onChange: function() {
    this._setState();
  },
  _setState: function() {
    if(this.isMounted()) {
      var user = this.getQuery().id || 1;
      this.setState(getStateFromStores(user));
    }
  },
  getInitialState: function() {
    var user = this.getQuery().id || 1;
    return getStateFromStores(user);
  },
  handleClick: function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  render: function() {
    document.title = 'Reacter News';

    var stories = this.state.stories.map(story => {
      var commentByStoryId = this.state.comments.filter(comment => {
        if(comment.parentId === story.id) {
          return comment;
        }
      });
      return (
        <li key={story.id}>
          <StoryComponent story={story} numberOfComments={commentByStoryId.size}/>
        </li>
      );
    });

    if(this.state.loading) {
      var renderedHTML = <LoaderComponent />;
    }
    else {
      var page = parseInt(this.getQuery().p) || 1;
      var userId = this.getQuery().id;

      var index = (30 * (page-1)) + 1;
      var nextPage = page + 1;
      var link = (this.state.stories.size === 30) ?
        <Link to='submitted' query={{ id: userId, p: nextPage }} onClick={this.handleClick}>More</Link>
        : null;

      var renderedHTML = (
        <div>
          <ol className='stories' start={index}>
          {stories.toArray()}
          </ol>
          <div className='more-link'>
          {link}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className='main'>
        {renderedHTML}
        </div>
        <SpacerComponent />
        <FooterComponent />
      </div>
    )
  }

});

module.exports = SubmittedComponent;
