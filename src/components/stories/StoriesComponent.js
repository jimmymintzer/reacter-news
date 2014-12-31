var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var StoryComponent = require('./StoryComponent');
var TopStoriesStore = require('../../stores/TopStoriesStore');
var ReacterNewsWebAPIUtils = require('../../utils/ReacterNewsWebAPIUtils');
var SpacerComponent = require('./../common/SpacerComponent');
var FooterComponent = require('./../common/FooterComponent');

function getStateFromStores() {
  return {
    stories: TopStoriesStore.getAll()
  };
}

var StoriesComponent = React.createClass({
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
        ReacterNewsWebAPIUtils.getTopStories(page);
      }

    }
  },
  getInitialState: function() {
    return getStateFromStores();
  },
  componentDidMount: function() {
    TopStoriesStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    TopStoriesStore.removeChangeListener(this._onChange);
  },
  handleClick: function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  render: function() {
    var stories = this.state.stories.map(function(story, index) {
      if(story) {
        return (
          <li key={index}>
            <StoryComponent story={story} />
          </li>
        );
      }

    });
    document.title = "Reacter News";

    var page = parseInt(this.getQuery().p);
    var link = null;
    var index = 1;

    if(this.state.stories && this.state.stories.length !== 0) {
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

    return (
      <div>
        <div className="main">
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

  /**
   * Event handler for 'change' events coming from TopStoriesStore
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = StoriesComponent;