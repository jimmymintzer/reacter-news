import ReacterNewsDispatcher from '../dispatcher/ReacterNewsDispatcher';
import { ActionTypes } from '../constants/ReacterNewsConstants';
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Immutable = require('immutable');

var CHANGE_EVENT = 'change';

var _stories = Immutable.List();
var _submitted_stories = Immutable.List();
var _submittedLoading = false;
var _loading = false;
var _initialized = false;

var _addStories = (rawStories) => {
  _stories = Immutable.List(rawStories);
};

var _addStory = (rawStory) => {
  _stories = _stories.push(rawStory);
};

var _addSubmittedStories = (rawStories) => {
  _submitted_stories = Immutable.List(rawStories);
};

var sortTime = (a, b) => {
  if (a.time < b.time) {
    return 1;
  }
  if (a.time > b.time) {
    return -1;
  }
  return 0;
};

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

  getLoadingStatus: () => _loading,

  getSubmittedLoadingStatus: () => _submittedLoading,

  getInitializedState: () => _initialized,

  getStory: (itemid) => {
    return _stories
      .filter(story => story.id == itemid)
      .get(0) || {};
  },

  getAllStories: () => _stories,

  getAllSubmittedStories: () => _submitted_stories,

  getStoriesByPage: (page) => {
    var start = 30 * (page-1);
    var end = (start + 30);

    return _stories
      .slice(start, end);
  },

  getStoriesByPageAndSortedTime: (page) => {
    var start = 30 * (page - 1);
    var end = (start + 30);

    return _stories
      .slice()
      .sort(sortTime)
      .slice(start, end);
  },

  getAskHNStories: (page) => {
    var start = 30 * (page-1);
    var end = (start + 30);

    return _stories
      .filter(story => story.url === '' && story.type !== 'job')
      .slice(start, end);
  },

  getShowHNStories: (page, sort) => {
    var start = 30 * (page-1);
    var end = (start + 30);

    var showHNStories = _stories
      .filter(story => !story.deleted)
      .filter(story => story.title && story.title.indexOf('Show HN:') !== -1)
      .slice(start, end);

    if(sort) {
      return showHNStories
        .sort(sortTime);
    }
    else {
      return showHNStories;
    }
  },

  getJobsStories: (page) => {
    var start = 30 * (page-1);
    var end = (start + 30);

    return _stories
      .filter(story => story.type === 'job')
      .slice(start, end);
  }
});

StoriesStore.dispatchToken = ReacterNewsDispatcher.register(payload => {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_RAW_STORIES:
      _addStories(action.rawStories);
      StoriesStore.emitChange();
      break;
    case ActionTypes.RECEIVE_RAW_SUBMITTED_STORIES:
      _addSubmittedStories(action.rawStories);
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
    case ActionTypes.CLEAR_STORIES:
      _loading = false;
      _initialized = false;
      StoriesStore.emitChange();
      break;
    case ActionTypes.SUBMITTED_STORIES_LOADING:
      _submittedLoading = true;
      StoriesStore.emitChange();
      break;
    case ActionTypes.SUBMITTED_STORIES_FINISHED_LOADING:
      _submittedLoading = false;
      StoriesStore.emitChange();
      break;
    case ActionTypes.CLEAR_SUBMITTED_STORIES:
      _submitted_stories = [];
      StoriesStore.emitChange();
      break;
    default:
      break;
  }

});

export default StoriesStore;
