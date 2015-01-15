var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_RAW_TOP_STORIES: null,
    RECEIVE_RAW_STORY: null,
    RECEIVE_RAW_COMMENT: null,
    RECEIVE_USER: null,
    RECEIVE_RAW_POLL: null,
    RECEIVE_RAW_JOBS: null
  }),

  PayloadSource: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};