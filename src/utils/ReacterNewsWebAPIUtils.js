var Firebase = require('firebase');
var TopStoriesActionCreators = require('../actions/TopStoriesActionCreators');
var UserActionCreators = require('../actions/UserActionCreators');
var Promise = require('bluebird');
var request = require('superagent');


var fb = new Firebase("http://hacker-news.firebaseio.com/v0/");
var itemsRef = fb.child('item');

var _fetchTopStories = function() {
  var promise = new Promise(function(resolve, reject) {
    fb.child('topstories').limitToFirst(30).on('value', function(snapshot) {
      resolve(snapshot.val());
    }, function(err) {
      reject("_fetchTopStories",err);
    });
  });

  return promise;
};

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
      reject("_fetchItem",errorObject);
    })
  });

  return promise;
};

var _fetchItemWithComments = function(item) {
  var promise = new Promise(function(resolve, reject) {
    request.get('https://hn.algolia.com/api/v1/items/' + item, function(res) {
      resolve(res.body);
    });
  });

  return promise;
};

var _fetchUser = function(user) {
  var promise = new Promise(function(resolve, reject) {
    fb.child('user').child(user).on('value', function(snapshot) {
      resolve(snapshot.val());
    }, function(err) {
      reject("_fetchUser",err);
    });
  });

  return promise;
};



ReacterNewsWebAPIUtils = {

  getAllTopStories: function() {
    _fetchTopStories()
      .then(_fetchAllStories, function(result) {

        console.log("result", result);
        return result;
      }, function(err) {
        console.log("error", err);
      })
      .then(TopStoriesActionCreators.receiveAll);
  },

  getStory: function(storyId) {
    _fetchItemWithComments(storyId)
      .then(TopStoriesActionCreators.receiveStory);
  },

  getUser: function(userId) {
    _fetchUser(userId)
      .then(UserActionCreators.receiveUser);
  }

};

module.exports = ReacterNewsWebAPIUtils;