// TODO: DELETE ME

var APIUtils = require('../utils/ReacterNewsWebAPIUtils');

module.exports = {
  statics: {
    willTransitionTo: function(transition, params, query) {
      var id = query.id || '';
      APIUtils.getStory(id);
    }
  }
};
