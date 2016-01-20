// TODO: DELETE ME

var APIUtils = require('../utils/ReacterNewsWebAPIUtils');

module.exports = {
  statics: {
    willTransitionTo: function(transition, params, query) {
      var id = query.id || 0;
      var p = query.p || 1;
      APIUtils.getUserSubmissions(id, p);
    }
  }
};
