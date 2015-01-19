var React = require('react');
var Router = require('react-router');
var ReacterNewsWebAPIUtils = require('../../utils/ReacterNewsWebAPIUtils');
var UsersStore = require('../../stores/UsersStore');
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
  mixins: [Router.State],
  statics :{
    willTransitionTo: function(transition, params, query) {
      _id = query.id || '';
      ReacterNewsWebAPIUtils.getUser(_id);
    }
  },
  getInitialState: function() {
    return getStateFromStores();
  },
  componentDidMount: function() {
    UsersStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    UsersStore.removeChangeListener(this._onChange);
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
  },
  /**
   * Event handler for 'change' events coming from StoriesStore
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = UserComponent;