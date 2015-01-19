var APIUtils = require('../utils/ReacterNewsWebAPIUtils');

module.exports = {
  statics: {
    willTransitionTo: function() {
      APIUtils.getTopStoriesAndComments();
    }
  }
};