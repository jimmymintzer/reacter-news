var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');

var ActionTypes = ReacterNewsConstants.ActionTypes;

module.exports = {

  receiveUser: function(rawMessages) {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_USER,
      rawMessages: rawMessages
    });
  }

};