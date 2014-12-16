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
    return new Promise(function(resolve, reject) {
      return itemsRef.child(story).on('value', function(itemData) {
        if(itemData.val().type !== "job") {
          return _fetchItemWithComments(itemData.val()).then(function(result) {
            resolve(result);
          });
        }
        else {
          resolve(itemData.val());
        }
      }, function(errorObject) {
        reject("_fetchItem",errorObject);
      })
    });
  });

  return Promise.all(promises);
};

var _fetchItemWithComments = function(item) {
  var promise = new Promise(function(resolve, reject) {
    var url = 'https://hn.algolia.com/api/v1/items/' + item.id;

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onreadystatechange = function() {
      if (this.readyState === 4){
        if (this.status >= 200 && this.status < 400){
          var responseText = JSON.parse(this.responseText);
          resolve(responseText);
        } else {
          // Error :(
        }
      }
    };
    request.send();
    request = null;
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
      .then(_fetchAllStories)
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