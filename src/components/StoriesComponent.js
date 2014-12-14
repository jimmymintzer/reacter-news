var React = require('react');
var StoryComponent = require('./StoryComponent');
var TopStoriesStore = require('../stores/TopStoriesStore');
var ReacterNewsWebAPIUtils = require('../utils/ReacterNewsWebAPIUtils');
var SpacerComponent = require('./SpacerComponent');
var FooterComponent = require('./FooterComponent');

function getStateFromStores() {
  return {
    stories: TopStoriesStore.getAll()
  };
}

var StoriesComponent = React.createClass({
  statics :{
    willTransitionTo: function() {
      ReacterNewsWebAPIUtils.getAllMessages();
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
  render: function() {
    return (
      <div>
      <div className="main">
        <ol className="stories">
          {this.state.stories.map(function(story, index) {
            return (
              <li key={index}>
                <StoryComponent story={story}/>
              </li>
            )
          })}
        </ol>
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