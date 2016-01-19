var React = require('react');
var Router = require('react-router');
var UsersStore = require('../../stores/UsersStore');
var UserItemComponent = require('./UserItemComponent');
var LoaderComponent = require('../common/LoaderComponent');
var APIUtils = require('../../utils/ReacterNewsWebAPIUtils');

function getStateFromStores(id) {
  return {
    user: UsersStore.get(id),
    loading: UsersStore.getLoadingStatus()
  };
}

var UserComponent = React.createClass({
  componentDidMount: function() {
    UsersStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    UsersStore.removeChangeListener(this._onChange);
    var id = query.id || '';
    APIUtils.getUser(id);
  },
  _onChange: function() {
    var id = this.getQuery().id || '';
    this.setState(getStateFromStores(id));
  },
  getInitialState: function() {
    var id = this.getQuery().id || '';
    return getStateFromStores(id);
  },
  render: function() {
    var user = this.state.user;

    if(this.state.loading) {
      var renderedHTML = (
        <LoaderComponent />
      );
    }
    else {
      var renderedHTML = (
        <div className='user-component'>
          <UserItemComponent user={user} />
        </div>
      );
    }
    return (
      <div>{renderedHTML}</div>
    );
  }
});

module.exports = UserComponent;
