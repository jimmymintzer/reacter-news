var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_RAW_TOP_STORY: null,
    RECEIVE_STORY_MESSAGE: null,
    RECEIVE_RAW_COMMENTS: null,
    RECEIVE_USER: null
  }),

  PayloadSource: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};