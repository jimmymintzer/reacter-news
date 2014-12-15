var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');

var ActionTypes = ReacterNewsConstants.ActionTypes;

module.exports = {

  receiveAll: function(rawMessages) {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_MESSAGES,
      rawMessages: rawMessages
    });
  },

  receiveStory: function(rawMessages) {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_STORY_MESSAGE,
      rawMessages: rawMessages
    });
  }

};