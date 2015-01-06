var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ReacterNewsConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _comments = {};

function _addComment(rawComments) {

  if(!rawComments.comment.deleted) {
    _comments[rawComments.parent] = _comments[rawComments.parent] || {};
    var parent = _comments[rawComments.parent];
    _comments[rawComments.parent].comments = parent.comments || [];
    _comments[rawComments.parent].count = parent.count || 0;

    _comments[rawComments.parent].count++;
    parent.comments.push(rawComments.comment);
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
    return _comments[parent] || [];
  },

  getAllComments: function() {
    return _comments;
  }
});

CommentsStore.dispatchToken = ReacterNewsDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_RAW_COMMENTS:
      _addComment(action.rawComments);
      CommentsStore.emitChange();
      break;
    default:
      break;
  }

});

module.exports = CommentsStore;