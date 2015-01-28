var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Immutable = require('immutable');

var ActionTypes = ReacterNewsConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _comments = Immutable.Map();
var _loading = false;

var _addComment = (rawComments) => {
  if(!rawComments.deleted) {
    _comments = _comments.set(rawComments.id, rawComments);
  }
};

var sortTime = (a, b) => {
  if(a.time < b.time) {
    return 1;
  }
  if(a.time > b.time) {
    return -1;
  }
  return 0;
};

var CommentsStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCommentById: (parent) => {
    return _comments.filter(comment => {
      if(comment.parentId == parent) {
        return comment;
      }
    });
  },

  getAllComments: () => _comments,

  getLoadingStatus: () => _loading,

  getCommentsByDate: (page) => {
    page = page || 1;
    var start = 30 * (page-1);
    var end = (start + 30);

    return _comments
      .sort(sortTime)
      .slice(start, end);
  },

  getCommentsByUser: (user, page) => {
    var page = page || 1;
    var start = 10 * (page-1);
    var end = start + 10;

    return _comments
      .filter(comment => comment.by === user)
      .filter(comment => comment.parentStoryDetails)
      .sort(sortTime)
      .slice(start, end);
  }
});

CommentsStore.dispatchToken = ReacterNewsDispatcher.register(payload => {
  var action = payload.action;

  switch(action.type) {
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