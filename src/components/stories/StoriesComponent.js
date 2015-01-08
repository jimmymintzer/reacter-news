var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var StoryComponent = require('./StoryComponent');
var CommentsStore = require('../../stores/CommentsStore');
var TopStoriesStore = require('../../stores/TopStoriesStore');
var ReacterNewsWebAPIUtils = require('../../utils/ReacterNewsWebAPIUtils');
var SpacerComponent = require('./../common/SpacerComponent');
var FooterComponent = require('./../common/FooterComponent');

var _  = require('../../utils/UnderscoreDebounce');


function getStateFromStores(page) {
  return {
    stories: TopStoriesStore.getTopStories(page),
    comments: CommentsStore.getAllComments()
  };
}

var StoriesComponent = React.createClass({
  getDefaultProps: function () {
    return {
      stories: [],
      comments: []
    }
  },
  mixins: [Router.State],
  statics: {
    willTransitionTo: function(transition, params, query) {
      var page = query.p || '';
      if(page && page < 1) {
        transition.redirect("news", {}, {});
      }
      else if(page > 4) {
        transition.redirect("news", {}, { p: 4 });
      }
      else {
        ReacterNewsWebAPIUtils.getTopStoriesAndComments(page);
      }

    }
  },
  getInitialState: function() {
    var page = this.getQuery().p || '';
    return getStateFromStores(page);
  },
  componentDidMount: function() {
    TopStoriesStore.addChangeListener(this._onChange);
    CommentsStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    TopStoriesStore.removeChangeListener(this._onChange);
    CommentsStore.removeChangeListener(this._onChange);
  },
  handleClick: function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  render: function() {

    document.title = "Reacter News";

    var stories = this.state.stories.map(function(story, index) {
      return (
        <li key={index}>
          <StoryComponent story={story} comments={this.state.comments.get(story.id)}/>
        </li>
      );
    }.bind(this));

    if(this.state.stories.length === 0 ) {
      var renderedHTML = (
        <div className="spinner-center">
          <i className="fa fa-refresh fa-spin"></i>
        </div>
      );
    }
    else {
      if(this.state.stories && this.state.stories.length !== 0) {
        var page = parseInt(this.getQuery().p);
        var link = null;
        var index = 1;

        if(page < 2 || !page) {
          index = 1;
          link = <Link to="news" query={{ p: 2 }} onClick={this.handleClick}>More</Link>;
        }
        else if(page >= 4) {
          index = 91;
        }
        else {
          index = 30 * (page-1) + 1;
          var nextPage = 1 + page;
          link = <Link to="news" query={{ p: nextPage }} onClick={this.handleClick}>More</Link>;
        }
      }
    }

    return (
      <div>
        <div className="main">
        {renderedHTML}
          <ol className="stories" start={index}>
          {stories}
          </ol>
          <div className="more-link">
          {link}
          </div>
        </div>
        <SpacerComponent />
        <FooterComponent />
      </div>
    )
  },
  _onChange: _.debounce(function () {
    this._setState();
  }, 75),

  _setState: function() {
    if(this.isMounted()) {
      var page = this.getQuery().p || '';
      this.setState(getStateFromStores(page));
    }
  }

});

module.exports = StoriesComponent;