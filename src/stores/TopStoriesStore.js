var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ReacterNewsConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _topStories = [];

function _addTopStories(rawTopStory) {
  _topStories = rawTopStory;
}

function _addStory(rawTopStory) {
  _topStories.push(rawTopStory);
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
    var story = _topStories.filter(function(story) {
      return story.id == itemid;
    });

    return story[0] || {};
  },

  getAllTopStories: function() {
    return _topStories;
  },

  getTopStories: function(page) {
    var start = 30 * (page-1);
    var end = (start + 30);

    return _topStories.slice(start, end);
  },

  getTopStoriesByTime: function(page) {
    var start = 30 * (page-1);
    var end = (start + 30);
    var sortedTopStories = _topStories.slice();

    sortedTopStories.sort(function (a, b) {
      if (a.time < b.time) {
        return 1;
      }
      if (a.time > b.time) {
        return -1;
      }
      return 0;
    });

    return sortedTopStories.slice(start, end);
  },

  getAskHNStories: function(page) {
    var start = 30 * (page-1);
    var end = (start + 30);

    var askHNStories = _topStories.filter(function(story) {
      return story.url === "" && story.type !== "job";
    });

    return askHNStories.slice(start, end) || -1;
  },

  getAskHNStoriesLength: function() {
    var askHNStories = _topStories.filter(function(story) {
      return story.url === "" && story.type !== "job";
    });

    return (askHNStories.length === 0) ? -1 : askHNStories.length;
  },

  getShowHNStories: function(page) {
    var start = 30 * (page-1);
    var end = (start + 30);

    var askHNStories = _topStories.filter(function(story) {
      return story.title.indexOf("Show HN:") !== -1;
    });

    return askHNStories.slice(start, end);
  },

  getShowHNStoriesLength: function() {
    var askHNStories = _topStories.filter(function(story) {
      return story.title.indexOf("Show HN:") !== -1;
    });

    return askHNStories.length;
  },

  getNewestShowHNStories: function(page) {
    var start = 30 * (page-1);
    var end = (start + 30);

    var askHNStories = _topStories.filter(function(story) {
      return story.title.indexOf("Show HN:") !== -1;
    });

    askHNStories.sort(function (a, b) {
      if (a.time < b.time) {
        return 1;
      }
      if (a.time > b.time) {
        return -1;
      }
      return 0;
    });

    return askHNStories.slice(start, end);
  },

  getNewestShowHNStoriesLength: function() {
    var askHNStories = _topStories.filter(function(story) {
      return story.title.indexOf("Show HN:") !== -1;
    });

    return askHNStories.length;
  },

  getJobsStories: function() {
    return _topStories.filter(function(story) {
      return story.type === "job";
    });
  },

  getSubmittedStories: function(user) {
   return _topStories.filter(function(story) {
     return story.by === user;
   });
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