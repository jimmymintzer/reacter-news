var React = require('react');
var Router = require('react-router');
var ReacterNewsWebAPIUtils = require('../utils/ReacterNewsWebAPIUtils');
var TopStoriesStore = require('../stores/TopStoriesStore');

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
    var kids = this.state.item && this.state.item.author;
    return (
      <div>
        <h1>Items Here</h1>
        <h3>{kids}</h3>
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