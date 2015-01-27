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

  clearStories: function() {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.CLEAR_STORIES
    });
  },

  setSubmittedLoading: function() {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.SUBMITTED_STORIES_LOADING
    });
  },

  stopSubmittedLoading: function() {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.SUBMITTED_STORIES_FINISHED_LOADING
    });
  },

  clearSubmittedStories: function() {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.CLEAR_SUBMITTED_STORIES
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
  },

  receiveSubmittedStories: function(rawStories) {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_SUBMITTED_STORIES,
      rawStories: rawStories
    });
  }

};