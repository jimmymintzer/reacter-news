var React = require('react');
var Router = require('react-router');
var ReacterNewsWebAPIUtils = require('../../utils/ReacterNewsWebAPIUtils');
var UsersStore = require('../../stores/UsersStore');
var UserItemComponent = require('./UserItemComponent');

function getStateFromStores(id) {
  return {
    user: UsersStore.get(id)
  };
}

var UserComponent = React.createClass({
  mixins: [Router.State],
  statics :{
    willTransitionTo: function(transition, params, query) {
      var id = query.id || '';
      ReacterNewsWebAPIUtils.getUser(id);
    }
  },
  getInitialState: function() {
    var id = this.getQuery().id;
    return getStateFromStores(id);
  },
  componentDidMount: function() {
    UsersStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    UsersStore.removeChangeListener(this._onChange);
  },
  render: function() {
    return (
      <div className="user-component">
        <UserItemComponent user={this.state.user} />
      </div>
    );
  },
  /**
   * Event handler for 'change' events coming from StoriesStore
   */
  _onChange: function() {
    var id = this.getQuery().id;
    this.setState(getStateFromStores(id));
  }
});

module.exports = UserComponent;