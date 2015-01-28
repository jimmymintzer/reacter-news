var StoriesStore = require('../stores/StoriesStore');

module.exports = {
  componentDidMount: function() {
    StoriesStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    StoriesStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this._setState();
  }

};