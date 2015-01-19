var UsersStore = require('../stores/UsersStore');

module.exports = {
  componentDidMount: function() {
    UsersStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    UsersStore.removeChangeListener(this._onChange);
  }
};