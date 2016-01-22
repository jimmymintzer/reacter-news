// TODO: Convert to es6 and fix eslint errors
import ReacterNewsDispatcher from '../dispatcher/ReacterNewsDispatcher';
import { ActionTypes } from '../constants/ReacterNewsConstants';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import { List as list } from 'immutable';

const CHANGE_EVENT = 'change';

let _stories = list();
let _submittedStories = list();
let _submittedLoading = false;
let _loading = false;
let _initialized = false;

const _addStories = (rawStories) => {
  _stories = list(rawStories);
};

const _addStory = (rawStory) => {
  _stories = _stories.push(rawStory);
};

const _addSubmittedStories = (rawStories) => {
  _submittedStories = list(rawStories);
};

const sortTime = (a, b) => {
  if (a.time < b.time) {
    return 1;
  }
  if (a.time > b.time) {
    return -1;
  }
  return 0;
};

const StoriesStore = assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getLoadingStatus: () => _loading,

  getSubmittedLoadingStatus: () => _submittedLoading,

  getInitializedState: () => _initialized,

  getStory: (itemid) => {
    return _stories
      .filter(story => story.id === itemid)
      .get(0) || {};
  },

  getAllStories: () => _stories,

  getAllSubmittedStories: () => _submittedStories,

  getStoriesByPage: (page) => {
    const start = 30 * (page - 1);
    const end = (start + 30);

    return _stories
      .slice(start, end);
  },

  getStoriesByPageAndSortedTime: (page) => {
    const start = 30 * (page - 1);
    const end = (start + 30);

    return _stories
      .slice()
      .sort(sortTime)
      .slice(start, end);
  },

  getAskHNStories: (page) => {
    const start = 30 * (page - 1);
    const end = (start + 30);

    return _stories
      .filter(story => story.url === '' && story.type !== 'job')
      .slice(start, end);
  },

  getShowHNStories: (page, sort) => {
    const start = 30 * (page - 1);
    const end = (start + 30);

    const showHNStories = _stories
      .filter(story => !story.deleted)
      .filter(story => story.title && story.title.indexOf('Show HN:') !== -1)
      .slice(start, end);

    if (sort) {
      return showHNStories
        .sort(sortTime);
    }
    return showHNStories;
  },

  getJobsStories: (page) => {
    const start = 30 * (page - 1);
    const end = (start + 30);

    return _stories
      .filter(story => story.type === 'job')
      .slice(start, end);
  },
});

StoriesStore.dispatchToken = ReacterNewsDispatcher.register(payload => {
  const action = payload.action;

  switch (action.type) {
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
      _submittedStories = [];
      StoriesStore.emitChange();
      break;
    default:
      break;
  }
});

export default StoriesStore;
