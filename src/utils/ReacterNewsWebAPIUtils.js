var Firebase = require('firebase');
var TopStoriesActionCreators = require('../actions/TopStoriesActionCreators');
var Promise = require('es6-promise').Promise;

var fb = new Firebase("http://hacker-news.firebaseio.com/v0/");
var topstoriesRef = fb.child('topstories');
var itemsRef = fb.child('item');

var _getTopStoryIds = new Promise(function(resolve, reject) {
  topstoriesRef.once('value', function(snapshot) {
    resolve(snapshot.val());
  }, function(errorObject) {
    reject(errorObject);
  });
});

var _getTopStoryDetails = function(stories) {
  return new Promise(function(resolve, reject) {

    var promiseArr = [];

    stories.forEach(function(story) {
      promiseArr.push( _buildTopStoryDetails(story) );
    });

    Promise.all(promiseArr).then(function(values) {
      resolve(values);
    }, function(errorObject) {
      reject(errorObject);
    });

  });
};

var _buildTopStoryDetails = function(storyId) {
  return new Promise(function(resolve, reject) {
    itemsRef.child(storyId).on('value', function(itemDetails) {
      resolve(itemDetails.val());
    }, function(errorObject) {
      reject(errorObject);
    })
  });
};

ReacterNewsWebAPIUtils = {

  getAllMessages: function() {

    _getTopStoryIds
      .then(function(storyIds) {
        return _getTopStoryDetails(storyIds);
      }, function(errorObject) {
        console.log(errorObject);
      })
      .then(function(storyDetails) {
        TopStoriesActionCreators.receiveAll(storyDetails);
      }, function(errorObject) {
        console.log(errorObject);
      })

  }

};

module.exports = ReacterNewsWebAPIUtils;