var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ReacterNewsConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _stories = [];
var _loading = false;
var _initialized = false;

function _addStories(rawStories) {
  _stories = rawStories;
}

function _addStory(rawStory) {
  _stories.push(rawStory);
}

function sortTime(a, b) {
  if (a.time < b.time) {
    return 1;
  }
  if (a.time > b.time) {
    return -1;
  }
  return 0;
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

  getLoadingStatus: function() {
    return _loading;
  },

  getInitalizedState: function() {
    return _initialized;
  },

  getStory: function(itemid) {
    return _stories
      .filter(function(story) {
        return story.id == itemid;
      })
      [0] || {};
  },

  getAllStories: function() {
    return _stories;
  },

  getStoriesByPage: function(page) {
    var start = 30 * (page-1);
    var end = (start + 30);

    return _stories.slice(start, end);
  },

  getStoriesByPageAndSortedTime: function(page) {
    var start = 30 * (page-1);
    var end = (start + 30);

    return _stories
      .slice()
      .sort(sortTime)
      .slice(start, end);
  },

  getAskHNStories: function(page) {
    var start = 30 * (page-1);
    var end = (start + 30);

    return _stories
      .filter(function(story) {
        return story.url === "" && story.type !== "job";
      })
      .slice(start, end);
  },

  getShowHNStories: function(page, sort) {
    var start = 30 * (page-1);
    var end = (start + 30);

    var showHNStories = _stories
      .filter(function(story) {
        return story.title.indexOf("Show HN:") !== -1;
      })
      .slice(start, end);
    if(sort) {
      return showHNStories.sort(sortTime);
    }
    else {
      return showHNStories;
    }
  },

  getJobsStories: function() {
    return _stories.filter(function(story) {
      return story.type === "job";
    });
  },

  getSubmittedStories: function(user) {
   return _stories.filter(function(story) {
     return story.by === user;
   });
  }
});

StoriesStore.dispatchToken = ReacterNewsDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_RAW_STORIES:
      _addStories(action.rawStories);
      StoriesStore.emitChange();
      break;
    case ActionTypes.RECEIVE_RAW_STORY:
      _addStory(action.rawStory);
      StoriesStore.emitChange();
      break;
    case ActionTypes.STORIES_LOADING:
      _loading = true;
      StoriesStore.emitChange();
      break;
    case ActionTypes.STORIES_FINISHED_LOADING:
      _loading = false;
      _initialized = true;
      StoriesStore.emitChange();
      break;
    default:
      break;
  }

});

module.exports = StoriesStore;