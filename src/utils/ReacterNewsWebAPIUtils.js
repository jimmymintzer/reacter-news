var Firebase = require('firebase');
var TopStoriesActionCreators = require('../actions/TopStoriesActionCreators');
var CommentsActionCreators = require('../actions/CommentsActionCreators');
var UserActionCreators = require('../actions/UserActionCreators');
var PollActionCreators = require('../actions/PollActionCreators');
var Promise = require('bluebird');

var fb = new Firebase("http://hacker-news.firebaseio.com/v0/");

function getAllTopStoriesKeys() {
  return new Promise(function(resolve, reject) {
    fb.child('topstories').on('value', function(snapshot) {
      if(!snapshot.val()) {
        reject("_fetchTopStories: no valid stories");
      }
      else if(snapshot.val().constructor === Array) {
        resolve(snapshot.val());
      }
      else {
        /*
         If/when firebase returns an object and not and array.
         */
        var returnArray = [];
        Object.keys(snapshot.val()).forEach(function(key) {
          returnArray.push(snapshot.val()[key]);
        });
        resolve(returnArray);
      }
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
  })
}


ReacterNewsWebAPIUtils = {

  getTopStoriesAndComments: function(page) {
    page = parseInt(page) || 1;
    getAllTopStoriesKeys(page)
    .then(getTopStories)
    .then(function(topStoriesArray) {
        TopStoriesActionCreators.receiveTopStory(topStoriesArray);
        return topStoriesArray;
    })
    .then(function(topStoriesArray) {
      topStoriesArray.forEach(function(story, index) {
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
  },

  getStory: function(storyId) {
    getItem(storyId, function(story) {
      TopStoriesActionCreators.receiveStory(story);
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
    });
  },

  getUser: function(userId) {
    getUser(userId)
    .then(UserActionCreators.receiveUser)
    .catch(function(err) {
      console.log("getUser:", err);
    })
  }

};

module.exports = ReacterNewsWebAPIUtils;