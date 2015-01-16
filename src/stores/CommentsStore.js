var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ReacterNewsConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _comments = new Map();
var _allComments = [];

function _addComment(rawComments) {
  /*
   Ignore deleted comments
   */
  if(!rawComments.comment.deleted) {

    var comments = _comments.get(rawComments.parent) || new Map();

    comments.set(rawComments.comment.id, rawComments.comment);
    _comments.set(rawComments.parent, comments);
    _allComments.push(rawComments);
  }
}

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

  getCommentById: function(parent) {
    return _comments.get(parseInt(parent)) || new Map();
  },

  getAllComments: function() {
    return _comments;
  },

  getCommentsByDate: function(page) {
    var start = 30 * (page-1);
    var end = (start + 30);

    var duplicates = {};
    var cloneAllComments = _allComments.slice();
    var filteredAllComments = cloneAllComments.filter(function(comment) {
      return duplicates.hasOwnProperty(comment.comment.id) ? false : (duplicates[comment.comment.id] = true);
    });

    filteredAllComments.sort(function (a, b) {
      if (a.comment.time < b.comment.time) {
        return 1;
      }
      if (a.comment.time > b.comment.time) {
        return -1;
      }
      return 0;
    });
    return filteredAllComments.slice(0, 30)
  },

  getCommentsByUser: function(user) {
    var duplicates = {};
    var userFilteredDuplicates = {};
    return _allComments
      .slice()
      .filter(function(comment) {
        return duplicates.hasOwnProperty(comment.comment.id) ? false : (duplicates[comment.comment.id] = true);
      })
      .filter(function(comment) {
        return comment.comment.by === user;
      })
      .filter(function(comment) {
        return userFilteredDuplicates.hasOwnProperty(comment.parent) ? false : (userFilteredDuplicates[comment.parent] = true);
      });
  }
});

CommentsStore.dispatchToken = ReacterNewsDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_RAW_COMMENT:
      _addComment(action.rawComments);
      CommentsStore.emitChange();
      break;
    default:
      break;
  }

});

module.exports = CommentsStore;