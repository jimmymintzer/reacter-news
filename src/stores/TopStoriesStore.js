var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');
var ReacterNewsWebAPIUtils = require('../utils/ReacterNewsWebAPIUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ReacterNewsConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _topStories = [];

function _addTopStories(rawMessages) {
  _topStories = rawMessages;
}

var TopStoriesStore = assign({}, EventEmitter.prototype, {

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
    return _topStories[id];
  },

  getAll: function() {
    return _topStories;
  }
});

TopStoriesStore.dispatchToken = ReacterNewsDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_RAW_MESSAGES:
      _addTopStories(action.rawMessages);
      TopStoriesStore.emitChange();
      break;
    default:
      console.log('hit default...do nothing');
  }

});

module.exports = TopStoriesStore;