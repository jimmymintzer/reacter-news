var React = require('react');
var Router = require('react-router');
var ReacterNewsWebAPIUtils = require('../../utils/ReacterNewsWebAPIUtils');
var UsersStore = require('../../stores/UsersStore');
var UsersMixin = require('../../mixins/UsersMixin');
var UserItemComponent = require('./UserItemComponent');
var LoaderComponent = require('../common/LoaderComponent');

var _id;

function getStateFromStores() {
  return {
    user: UsersStore.get(_id),
    loading: UsersStore.getLoadingStatus()
  };
}

var UserComponent = React.createClass({
  mixins: [Router.State, UsersMixin],
  statics :{
    willTransitionTo: function(transition, params, query) {
      _id = query.id || '';
      ReacterNewsWebAPIUtils.getUser(_id);
    }
  },
  _onChange: function() {
    this.setState(getStateFromStores());
  },
  getInitialState: function() {
    return getStateFromStores();
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