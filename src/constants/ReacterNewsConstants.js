var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_RAW_MESSAGES: null,
    RECEIVE_USER: null
  }),

  PayloadSource: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};