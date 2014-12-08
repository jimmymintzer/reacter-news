var React = require('react');
var StoryComponent = require('./StoryComponent');
var TopStoriesStore = require('../stores/TopStoriesStore');

function getStateFromStores() {
  return {
    stories: TopStoriesStore.getAll()
  };
}

var StoriesComponent = React.createClass({
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