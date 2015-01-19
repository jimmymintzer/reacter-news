var Firebase = require('firebase');
var StoriesActionCreators = require('../actions/StoriesActionCreators');
var CommentsActionCreators = require('../actions/CommentsActionCreators');
var UserActionCreators = require('../actions/UserActionCreators');
var PollActionCreators = require('../actions/PollActionCreators');
var Promise = require('bluebird');

var fb = new Firebase("http://hacker-news.firebaseio.com/v0/");

function getAllTopStoriesKeys() {
  return new Promise(function(resolve, reject) {
    fb.child('topstories').on('value', function(snapshot) {
      resolve(snapshot.val());
    }, function(err) {
      reject(err);
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
  fb.child('item').child(item).on('value', function(snapshot) {
    cb(snapshot.val());
  });
}

function getUser(userId) {
  return new Promise(function(resolve, reject) {
    fb.child('user').child(userId).on('value', function(snapshot) {
      resolve(snapshot.val());
    }, function(err) {
      reject(err);
    });
  });
}

function getTopStories(stories) {
  var promisesArr = [];

  stories.map(function(story) {
    var p = new Promise(function(resolve, reject) {
      fb.child('item').child(story).on('value', function(snapshot) {
        resolve(snapshot.val());
      }, function(err) {
        reject(err);
      });
    });
    promisesArr.push(p);
  });

  return Promise.settle(promisesArr).map(function(story) {
    return story.value();
  });
}

ReacterNewsWebAPIUtils = {

  getTopStoriesAndComments: function() {
    StoriesActionCreators.setLoading();
    getAllTopStoriesKeys()
      .then(getTopStories)
      .then(function(topStoriesArray) {
          StoriesActionCreators.receiveStories(topStoriesArray);
          return topStoriesArray;
      })
      .then(function(topStoriesArray) {
        topStoriesArray.forEach(function(story) {
          if(story.kids && story.kids.length > 0) {
            getItems(story.kids, function(result) {
              CommentsActionCreators.receiveComment({
                comment: result,
                parent: story.id
              });
            });
          }
        });
      })
      .then(StoriesActionCreators.stopLoading)
  },

  getStory: function(storyId) {
    getItem(storyId, function(story) {
      StoriesActionCreators.receiveStory(story);
      if(story.parts && story.parts.length > 0) {
        getItems(story.parts, function(poll) {
          PollActionCreators.receivePoll(poll);
        });
      }
      if(story.kids && story.kids.length > 0) {
        getItems(story.kids, function(result) {
          CommentsActionCreators.receiveComment({
            comment: result,
            parent: story.id
          });
        });
      }
    })
  },

  getUser: function(userId) {
    UserActionCreators.setLoading();
    getUser(userId)
      .then(UserActionCreators.receiveUser)
      .then(UserActionCreators.stopLoading);
  },

  getUserSubmissions: function(userId, page) {
    var start = 30 * (page-1);
    var end = (start + 30);
    StoriesActionCreators.setSubmittedLoading();
    StoriesActionCreators.clearSubmittedStories();
    UserActionCreators.setLoading();
    getUser(userId)
      .then(function(userDetails) {
        UserActionCreators.receiveUser(userDetails);
        UserActionCreators.stopLoading();
        return userDetails.submitted;
      })
      .then(getTopStories)
      .then(function(submittedItems) {
        return submittedItems
          .filter(function(item) {
            return item && (item.type === "story" && !item.deleted)
          })
          .slice(start, end);
      })
      .then(function(stories) {
        StoriesActionCreators.receiveSubmittedStories(stories);
        stories.forEach(function(story) {
          if(story.kids && story.kids.length > 0) {
            getItems(story.kids, function(result) {
              CommentsActionCreators.receiveComment({
                comment: result,
                parent: story.id
              });
            });
          }
        });
      })
      .then(StoriesActionCreators.stopSubmittedLoading);

  }

};

module.exports = ReacterNewsWebAPIUtils;