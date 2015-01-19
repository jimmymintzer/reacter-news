var StoriesStore = require('../stores/StoriesStore');
var _ = require('../utils/UnderscoreDebounce');

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