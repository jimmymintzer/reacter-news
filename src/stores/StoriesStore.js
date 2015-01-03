var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ReacterNewsConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _stories = {};

function _addTopStories(rawMessages) {
  var page = rawMessages.page || 1;
  var stories = rawMessages.stories;

  _stories[page] = stories;
}

function _addStory(rawMessages) {
  var found = false;
  var foundIndex = -1;
  var foundOuterIndex = -1;

  Object.keys(_stories).forEach(function(page, outerIndex) {
    _stories[page].forEach(function( story, index ) {
      if ( story.id === rawMessages.id ) {
        found = true;
        foundIndex = index;
        foundOuterIndex = outerIndex;
      }
    });
  });

  if(!found) {
    _stories[0] = _topStories[0] || [];
    _stories[0].push(rawMessages);
  }
  else {
    _stories[foundOuterIndex][foundIndex] = rawMessages;
  }

}

var StoriesStore = assign({}, EventEmitter.prototype, {

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

    Object.keys(_stories).forEach(function(page) {
      _stories[page].forEach(function(story) {
        if(story.id == id) {
          foundStory = story;
        }
      });
    });

    return foundStory;
  },

  getStories: function(page) {
    var stories =_stories[page] || [];
    return stories;
  }
});

StoriesStore.dispatchToken = ReacterNewsDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_RAW_MESSAGES:
      _addTopStories(action.rawMessages);
      StoriesStore.emitChange();
      break;
    case ActionTypes.RECEIVE_STORY_MESSAGE:
      _addStory(action.rawMessages);
      StoriesStore.emitChange();
      break;
    default:
      break;
  }

});

module.exports = StoriesStore;