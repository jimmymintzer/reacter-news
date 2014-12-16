var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ReacterNewsConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _topStories = [];

function _addTopStories(rawMessages) {
  _topStories = rawMessages;
}

function _addStory(rawMessages) {
  var found = false;
  var foundIndex = -1;

  _topStories.forEach(function(story, index) {
    if(story.id === rawMessages.id) {
      found = true;
      foundIndex = index;
    }
  });

  if(!found) {
    _topStories.push(rawMessages);
  }
  else {
    _topStories[foundIndex] = rawMessages;
  }
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
    var foundStory = {};

    _topStories.forEach(function(story) {
      if(story.id == id) {
        foundStory = story;
      }
    });

    return foundStory;
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
    case ActionTypes.RECEIVE_STORY_MESSAGE:
      _addStory(action.rawMessages);
      TopStoriesStore.emitChange();
      break;
    default:
      break;
  }

});

module.exports = TopStoriesStore;