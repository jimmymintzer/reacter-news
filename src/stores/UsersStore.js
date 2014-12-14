var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ReacterNewsConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _users = [];

function _addUser(rawMessages) {
  _users[rawMessages.id] = rawMessages;
}

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

  get: function(id) {
    return _users[id];
  }

});

UsersStore.dispatchToken = ReacterNewsDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_USER:
      _addUser(action.rawMessages);
      UsersStore.emitChange();
      break;
    default:
      break;
  }

});

module.exports = UsersStore;