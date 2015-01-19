var CommentsStore = require('../stores/CommentsStore');
var _ = require('../utils/UnderscoreDebounce');

module.exports = {
  componentDidMount: function() {
    CommentsStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    CommentsStore.removeChangeListener(this._onChange);
  },
  _onChange: _.debounce(function () {
    this._setState();
  }, 75)

};