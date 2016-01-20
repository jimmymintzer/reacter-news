var ReacterNewsConstants = require('../constants/ReacterNewsConstants');
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var PayloadSource = ReacterNewsConstants.PayloadSource;

var ReacterNewsDispatcher = assign(new Dispatcher(), {

  handleServerAction: function(action) {
    var payload = {
      source: PayloadSource.SERVER_ACTION,
      action: action,
    };
    console.log('payload', payload);
    this.dispatch(payload);
  },

});

module.exports = ReacterNewsDispatcher;
