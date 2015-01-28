var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Immutable = require('immutable');

var ActionTypes = ReacterNewsConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _users = Immutable.Map();
var _loading = false;

var _addUser = (rawMessages) => {
  _users = _users.set(rawMessages.id, rawMessages);
};

var UsersStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: (id) => _users.get(id),

  getLoadingStatus: () => _loading

});

UsersStore.dispatchToken = ReacterNewsDispatcher.register(payload => {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_USER:
      _addUser(action.rawMessages);
      UsersStore.emitChange();
      break;
    case ActionTypes.USER_LOADING:
      _loading = true;
      UsersStore.emitChange();
      break;
    case ActionTypes.USER_FINISHED_LOADING:
      _loading = false;
      UsersStore.emitChange();
      break;
    default:
      break;
  }

});

module.exports = UsersStore;