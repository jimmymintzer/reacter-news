var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ReacterNewsConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _comments = new Map();
var _allComments = [];
var _loading = false;

function _addComment(rawComments) {
  if(!rawComments.deleted) {
    _comments.set(rawComments.id, rawComments);
  }
}

function sortTime(a, b) {
  if (a.comment.time < b.comment.time) {
    return 1;
  }
  if (a.comment.time > b.comment.time) {
    return -1;
  }
  return 0;
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
    var comments = new Map();
    _comments.forEach(function(comment) {
      if(parseInt(comment.parentId) == parent) {
        comments.set(comment.id, comment);
      }
    });
    return comments || new Map();
  },

  getAllComments: function() {
    return _comments;
  },

  getLoadingStatus: function() {
    return _loading;
  },

  getCommentsByDate: function(page) {
    page = page || 1;
    var start = 30 * (page-1);
    var end = (start + 30);

    var comments = [];
    _comments.forEach(function(comment) {
      comments.push(comment);
    });

    comments.sort(function(a, b) {
      if(a.time < b.time) {
        return 1;
      }
      if(a.time > b.time) {
        return -1;
      }
      return 0;
    });

    return comments.slice(start, end);


    //var duplicates = {};
    //var cloneAllComments = _allComments.slice();
    //var filteredAllComments = cloneAllComments.filter(function(comment) {
    //  return duplicates.hasOwnProperty(comment.comment.id) ? false : (duplicates[comment.comment.id] = true);
    //});
    //
    //filteredAllComments.sort(function (a, b) {
    //  if (a.comment.time < b.comment.time) {
    //    return 1;
    //  }
    //  if (a.comment.time > b.comment.time) {
    //    return -1;
    //  }
    //  return 0;
    //});
    //return filteredAllComments.slice(start, end)
  },

  getCommentsByUser: function(user, page) {
    var duplicates = {};

    var page = page || 1;
    var start = 10 * (page-1);
    var end = start + 10;

    var comments = [];
    _comments.forEach(function(comment) {
      comments.push(comment);
    });

    comments = comments.filter(function(comment) {

      return comment.by === user;
    })
    .filter(function(comment) {
        return comment.parentStoryDetails;
      })

    comments.sort(function(a, b) {
      if(a.time < b.time) {
        return 1;
      }
      if(a.time > b.time) {
        return -1;
      }
      return 0;
    });

    return comments.slice(start, end);


    //return _allComments
    //
    //  .filter(function(comment) {
    //    return duplicates.hasOwnProperty(comment.comment.id) ? false : (duplicates[comment.comment.id] = true);
    //  })
    //  .filter(function(comment) {
    //    return comment.comment.by === user && comment.parentStoryDetails;
    //  })
    //  .sort(sortTime)
    //  .slice(start, end);
  }
});

CommentsStore.dispatchToken = ReacterNewsDispatcher.register(function(payload) {
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