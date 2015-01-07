var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');

var ActionTypes = ReacterNewsConstants.ActionTypes;

module.exports = {

  receiveTopStory: function(rawTopStory) {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_TOP_STORY,
      rawTopStory: rawTopStory
    });
  },

  receiveStory: function(rawStoryMessage) {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_STORY_MESSAGE,
      rawStoryMessage: rawStoryMessage
    });
  }

};