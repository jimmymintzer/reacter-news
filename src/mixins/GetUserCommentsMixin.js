var APIUtils = require('../utils/ReacterNewsWebAPIUtils');

module.exports = {
  statics: {
    willTransitionTo: function(transition, params, query) {
      var userId = query.id || "";
      var page = query.p || 1;
      APIUtils.getUserComments(userId, page);
    }
  }
};