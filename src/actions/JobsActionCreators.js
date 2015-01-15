var ReacterNewsDispatcher = require('../dispatcher/ReacterNewsDispatcher');
var ReacterNewsConstants = require('../constants/ReacterNewsConstants');

var ActionTypes = ReacterNewsConstants.ActionTypes;

module.exports = {

  receiveJobs: function(rawJobs) {
    ReacterNewsDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_JOBS,
      rawJobs: rawJobs
    });
  }

};