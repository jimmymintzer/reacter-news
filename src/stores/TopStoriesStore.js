var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ReacterNewsConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _topStories = [];

function _addTopStories(rawTopStory) {
  var found = false;
  var foundIndex = -1;

  _topStories.forEach(function(story, index) {
    if(story.id == rawTopStory.id) {
      found = true;
      foundIndex = index;
      return;
    }
  });

  if(found) {
    _topStories[foundIndex] = rawTopStory;
  }
  else {
    _topStories.push(rawTopStory);
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

  getStory: function(id) {
    var found = false;
    var foundIndex = -1;

    _topStories.forEach(function(story, index) {
      if(story.id == id) {
        found = true;
        foundIndex = index;
        return;
      }
    });

    return (found) ? _topStories[foundIndex] : [];
  },

  getTopStories: function() {
    return _topStories;
  }
});

StoriesStore.dispatchToken = ReacterNewsDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_RAW_TOP_STORY:
      _addTopStories(action.rawTopStory);
      StoriesStore.emitChange();
      break;
    default:
      break;
  }

});

module.exports = StoriesStore;