var StoriesStore = require('../stores/StoriesStore');
var CommentsStore = require('../stores/CommentsStore');
var _ = require('../utils/UnderscoreDebounce');

module.exports = {
  componentDidMount: function() {
    StoriesStore.addChangeListener(this._onChange);
    CommentsStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    StoriesStore.removeChangeListener(this._onChange);
    CommentsStore.removeChangeListener(this._onChange);
  },
  _onChange: _.debounce(function () {
    this._setState();
  }, 75)

};