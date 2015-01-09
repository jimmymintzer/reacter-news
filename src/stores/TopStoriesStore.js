var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ReacterNewsConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _topStories = new Map();

function _addTopStories(rawTopStory) {
  var page = rawTopStory.page || 1;
  var stories = rawTopStory.stories;

  _topStories.set(page, stories);

}

function _addStory(rawMessages) {
  var found = false;
  var foundStoryIndex = -1;
  var foundPageIndex = -1;

  _topStories.forEach(function(page, pageIndex) {
    page.forEach(function( story, storyIndex ) {
      if ( story.id === rawMessages.id ) {
        found = true;
        foundStoryIndex = storyIndex;
        foundPageIndex = pageIndex;
      }
    });
  });

  if(!found) {
    /*
    Push item to 0 index because we don't know which page it is
     */
    var genericStories = _topStories.get(0) || [];
    genericStories.push(rawMessages);
    _topStories.set(0, genericStories);
  }
  else {
    var currentStories = _topStories.get(foundPageIndex);
    currentStories[foundStoryIndex] = rawMessages;
    _topStories.set(foundPageIndex, currentStories);
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

  getStory: function(itemid) {
    var foundStory = {};

    _topStories.forEach(function(page) {
      page.forEach(function(story) {
        if(story.id == itemid) {
          foundStory = story;
        }
      })
    });

    return foundStory;
  },

  getTopStories: function(page) {
    page = parseInt(page) || 1;
    return _topStories.get(page) || new Map();
  }
});

StoriesStore.dispatchToken = ReacterNewsDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_RAW_TOP_STORIES:
      _addTopStories(action.rawTopStory);
      StoriesStore.emitChange();
      break;
    case ActionTypes.RECEIVE_RAW_STORY:
      _addStory(action.rawStoryMessage);
      StoriesStore.emitChange();
      break;
    default:
      break;
  }

});

module.exports = StoriesStore;