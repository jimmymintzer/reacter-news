var APIUtils = require('../utils/ReacterNewsWebAPIUtils');

module.exports = {
  statics: {
    willTransitionTo: function(transition, params, query) {
      var userId = query.id || '';
      APIUtils.getUserComments(userId);
    }
  }
};