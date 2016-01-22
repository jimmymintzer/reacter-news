// TODO: Convert to es6 and fix eslint errors

import ReacterNewsDispatcher from '../dispatcher/ReacterNewsDispatcher';
import { ActionTypes } from '../constants/ReacterNewsConstants';
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Immutable = require('immutable');

var CHANGE_EVENT = 'change';

var _polls = Immutable.Map();

var _addPoll = (rawPoll) => {
  _polls = _polls.set(rawPoll.id, rawPoll);
};

var PollStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllPolls: () => _polls

});

PollStore.dispatchToken = ReacterNewsDispatcher.register(payload => {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_RAW_POLL:
      _addPoll(action.rawPolls);
      PollStore.emitChange();
      break;
    default:
      break;
  }

});

module.exports = PollStore;
