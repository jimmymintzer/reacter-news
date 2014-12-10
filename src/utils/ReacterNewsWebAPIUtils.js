var Firebase = require('firebase');
var TopStoriesActionCreators = require('../actions/TopStoriesActionCreators');
var Promise = require('es6-promise').Promise;

var fb = new Firebase("http://hacker-news.firebaseio.com/v0/");
var topstoriesRef = fb.child('topstories');
var itemsRef = fb.child('item');

var _getTopStoryIds = new Promise(function(resolve, reject) {
  topstoriesRef.limitToFirst(20).once('value', function(snapshot) {
    resolve(snapshot.val());
  }, function(errorObject) {
    reject(errorObject);
  });
});

var _getTopStoryDetails = function(stories) {
  return new Promise(function(resolve, reject) {

    var promiseArr = [];

    stories.forEach(function(story) {
      promiseArr.push( _getItem(story) );
    });

    Promise.all(promiseArr).then(function(values) {
      resolve(values);
    }, function(errorObject) {
      reject(errorObject);
    });

  });
};

var _getItem = function(item) {
  return new Promise(function(resolve, reject) {
    itemsRef.child(item).on('value', function(itemData) {
      resolve(itemData.val());
    }, function(errorObject) {
      reject(errorObject);
    })
  });
};

var _getComments = function(kids) {
  return new Promise(function(resolve, reject) {
    var promiseArr = [];

    kids.forEach(function(kid) {
      promiseArr.push(_getItem(kid));
    });

    Promise.all(promiseArr).then(function(values) {
      resolve(values);
    }, function(errObject) {
      reject(errObject);
    });
  })
};

var _getNestedComments = function(storyDetails) {
  storyDetails.forEach(function(story) {
    _getComments(story.kids).then(function(comments) {
      story.kids = comments;
      story.size = comments.length;
      if(story.kids && story.kids.length > 0) {
        _getNestedComments(story.kids);
      }
    });
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
        _getNestedComments(storyDetails);
        console.log(storyDetails);
        TopStoriesActionCreators.receiveAll(storyDetails);
      }, function(errorObject) {
        console.log(errorObject);
      })

  }

};

module.exports = ReacterNewsWebAPIUtils;