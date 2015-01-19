var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');

var ActionTypes = ReacterNewsConstants.ActionTypes;

module.exports = {

  setLoading: function() {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.COMMENTS_LOADING
    });
  },

  stopLoading: function() {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.COMMENTS_FINISHED_LOADING
    });
  },
  receiveComment: function(rawComments) {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_COMMENT,
      rawComments: rawComments
    });
  }

};