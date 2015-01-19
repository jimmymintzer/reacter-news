var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_RAW_STORIES: null,
    RECEIVE_RAW_STORY: null,
    RECEIVE_RAW_COMMENT: null,
    RECEIVE_RAW_POLL: null,
    RECEIVE_RAW_JOBS: null,
    STORIES_LOADING: null,
    STORIES_FINISHED_LOADING: null,
    USER_LOADING: null,
    USER_FINISHED_LOADING: null
  }),

  PayloadSource: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};