import ReacterNewsDispatcher from '../dispatcher/ReacterNewsDispatcher';
import { ActionTypes } from '../constants/ReacterNewsConstants';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import { Map } from 'immutable';

const CHANGE_EVENT = 'change';

let _comments = new Map();
let _loading = false;

const _addComment = (rawComments) => {
  if (!rawComments.deleted) {
    _comments = _comments.set(rawComments.id, rawComments);
  }
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

const CommentsStore = assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCommentById: (parent) => {
    return _comments.filter(comment => {
      if (comment.parentId === parent) {
        return comment;
      }
    });
  },

  getAllComments: () => _comments,

  getLoadingStatus: () => _loading,

  getCommentsByDate: (page) => {
    const start = 30 * (page - 1);
    const end = (start + 30);

    return _comments
      .sort(sortTime)
      .slice(start, end);
  },

  getCommentsByUser: (user, page) => {
    const start = 10 * (page - 1);
    const end = start + 10;

    return _comments
      .filter(comment => comment.by === user)
      .filter(comment => comment.parentStoryDetails)
      .sort(sortTime)
      .slice(start, end);
  },
});

CommentsStore.dispatchToken = ReacterNewsDispatcher.register(payload => {
  const action = payload.action;

  switch (action.type) {
    case ActionTypes.RECEIVE_RAW_COMMENT:
      _addComment(action.rawComments);
      CommentsStore.emitChange();
      break;
    case ActionTypes.COMMENTS_LOADING:
      _loading = true;
      CommentsStore.emitChange();
      break;
    case ActionTypes.COMMENTS_FINISHED_LOADING:
      _loading = false;
      CommentsStore.emitChange();
      break;
    default:
      break;
  }
});

module.exports = CommentsStore;
