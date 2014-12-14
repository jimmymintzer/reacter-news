var Firebase = require('firebase');
var TopStoriesActionCreators = require('../actions/TopStoriesActionCreators');
var Promise = require('bluebird');

var fb = new Firebase("http://hacker-news.firebaseio.com/v0/");
var itemsRef = fb.child('item');


function _fetchTopStories() {
  var promise = new Promise(function(resolve, reject) {
    fb.child('topstories').limitToFirst(30).on('value', function(snapshot) {
      resolve(snapshot.val());
    }, function(err) {
      reject(err);
    });
  });

  return promise;
}

var _fetchAllStories = function(stories) {
  var promises = stories.map(function(story) {
    return _fetchItem(story);
  });

  return Promise.all(promises);
};

var _fetchItem = function(item) {
  var promise = new Promise(function(resolve, reject) {
    itemsRef.child(item).on('value', function(itemData) {
      resolve(itemData.val());
    }, function(errorObject) {
      reject(errorObject);
    })
  });

  return promise;
};


ReacterNewsWebAPIUtils = {

  getAllMessages: function() {

    _fetchTopStories()
      .then(_fetchAllStories)
      .then(TopStoriesActionCreators.receiveAll);

  }

};

module.exports = ReacterNewsWebAPIUtils;