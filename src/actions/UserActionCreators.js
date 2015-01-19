var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');

var ActionTypes = ReacterNewsConstants.ActionTypes;

module.exports = {

  setLoading: function() {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.USER_LOADING
    });
  },

  stopLoading: function() {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.USER_FINISHED_LOADING
    });
  },

  receiveUser: function(rawMessages) {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_USER,
      rawMessages: rawMessages
    });
  }

};