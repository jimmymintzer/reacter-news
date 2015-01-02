var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ReacterNewsConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _topStories = {};

function _addTopStories(rawMessages) {
  var page = rawMessages.page || 1;
  var stories = rawMessages.stories;

  _topStories[page] = stories;
}

function _addStory(rawMessages) {
  console.log("_addStory", rawMessages);
  var found = false;
  var foundIndex = -1;
  var foundOuterIndex = -1;

  Object.keys(_topStories).forEach(function(page, outerIndex) {
    _topStories[page].forEach(function( story, index ) {
      if ( story.id === rawMessages.id ) {
        found = true;
        foundIndex = index;
        foundOuterIndex = outerIndex;
      }
    });
  });

  if(!found) {
    _topStories[0] = _topStories[0] || [];
    _topStories[0].push(rawMessages);
  }
  else {
    console.log(_topStories[foundOuterIndex][foundIndex]);
    _topStories[foundOuterIndex][foundIndex] = rawMessages;
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

    Object.keys(_topStories).forEach(function(page) {
      _topStories[page].forEach(function(story) {
        if(story.id == id) {
          foundStory = story;
        }
      });
    });

    return foundStory;
  },

  getStories: function(page) {
    var stories =_topStories[page] || [];
    return stories;
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