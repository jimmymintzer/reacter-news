var React = require('react');
var Router = require('react-router');
var ReacterNewsWebAPIUtils = require('../../utils/ReacterNewsWebAPIUtils');
var TopStoriesStore = require('../../stores/TopStoriesStore');
var StoryComponent = require('../stories/StoryComponent');

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
    return (
      <div className="item-wrapper">
        <StoryComponent story={this.state.item} />
      </div>
    );
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