// TODO: DELETE ME

var CommentsStore = require('../stores/CommentsStore');

module.exports = {
  componentDidMount: function() {
    CommentsStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    CommentsStore.removeChangeListener(this._onChange);
  },
  _onChange: this._setState(),
};
