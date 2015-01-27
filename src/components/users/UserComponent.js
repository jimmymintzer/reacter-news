var React = require('react');
var Router = require('react-router');
var GetUserMixin = require('../../mixins/GetUserMixin');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var UsersStore = require('../../stores/UsersStore');
var UsersMixin = require('../../mixins/UsersMixin');
var UserItemComponent = require('./UserItemComponent');
var LoaderComponent = require('../common/LoaderComponent');

function getStateFromStores(id) {
  return {
    user: UsersStore.get(id),
    loading: UsersStore.getLoadingStatus()
  };
}

var UserComponent = React.createClass({
  mixins: [Router.State, UsersMixin, GetUserMixin, PureRenderMixin],
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
        <div className="user-component">
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