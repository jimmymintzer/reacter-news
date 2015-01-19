var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');

var ActionTypes = ReacterNewsConstants.ActionTypes;

module.exports = {

  setLoading: function() {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.STORIES_LOADING
    });
  },

  stopLoading: function() {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.STORIES_FINISHED_LOADING
    });
  },

  receiveStories: function(rawStories) {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_STORIES,
      rawStories: rawStories
    });
  },

  receiveStory: function(rawStory) {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_STORY,
      rawStory: rawStory
    });
  }

};