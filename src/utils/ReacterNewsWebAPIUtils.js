var Firebase = require('firebase');
var TopStoriesActionCreators = require('../actions/TopStoriesActionCreators');
var CommentsActionCreators = require('../actions/CommentsActionCreators');
var UserActionCreators = require('../actions/UserActionCreators');
var Promise = require('bluebird');

var fb = new Firebase("http://hacker-news.firebaseio.com/v0/");

function getTopStories(cb) {
  fb.child('topstories').limitToFirst(30).once('value', function(snapshot) {
    snapshot.forEach(function(item) {
      getItem(item.val(), cb);
    });
  });
}

function getItems(items, cb) {
  items.forEach(function(item) {
    getItem(item, function(result) {
      cb(result);
      if(result.kids && result.kids.length > 0) {
        getItems(result.kids, cb);
      }
    });
  });
}

function getItem(item, cb) {
  fb.child('item').child(item).once('value', function(snapshot) {
    cb(snapshot.val());
  });
}

function getUser(userId, cb) {
  fb.child('user').child(userId).once('value', function(snapshot) {
    cb(snapshot.val());
  });
}


ReacterNewsWebAPIUtils = {

  getTopStoriesAndComments: function() {
    getTopStories(function(topStory) {
      TopStoriesActionCreators.receiveTopStory(topStory);
      if(topStory.kids && topStory.kids.length > 0) {
        getItems(topStory.kids, function(result) {
          CommentsActionCreators.receiveComment({
            comment: result,
            parent: topStory.id
          });
        });
      }
    });

  },

  getStory: function(storyId) {
    getItem(storyId, function(story) {
      TopStoriesActionCreators.receiveStory(story);
      if(story.kids && story.kids.length > 0) {
        getItems(story.kids, function(result) {
          CommentsActionCreators.receiveComment({
            comment: result,
            parent: story.id
          });
        });
      }
    });
  },

  getUser: function(userId) {
    getUser(userId, UserActionCreators.receiveUser);
  }

};

module.exports = ReacterNewsWebAPIUtils;