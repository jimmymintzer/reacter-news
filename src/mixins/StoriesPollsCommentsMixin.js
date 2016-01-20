// TODO: DELETE ME

var StoriesStore = require('../stores/StoriesStore');
var CommentsStore = require('../stores/CommentsStore');
var PollStore = require('../stores/PollStore');

module.exports = {
  componentDidMount: function() {
    StoriesStore.addChangeListener(this._onChange);
    CommentsStore.addChangeListener(this._onChange);
    PollStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    StoriesStore.removeChangeListener(this._onChange);
    CommentsStore.removeChangeListener(this._onChange);
    PollStore.removeChangeListener(this._onChange);
  },
  _onChange: this._setState(),
};
