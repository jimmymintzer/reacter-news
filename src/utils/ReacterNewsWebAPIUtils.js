var Firebase = require('firebase');
var StoriesActionCreators = require('../actions/StoriesActionCreators');
var CommentsActionCreators = require('../actions/CommentsActionCreators');
var UserActionCreators = require('../actions/UserActionCreators');
var PollActionCreators = require('../actions/PollActionCreators');
var Promise = require('bluebird');

var fb = new Firebase('http://hacker-news.firebaseio.com/v0/');

var getAllTopStoriesKeys = () => {
  return new Promise((resolve, reject) => {
    fb.child('topstories').on('value',
      snapshot => resolve(snapshot.val()),
      err => reject(err)
    );
  });
};

var getItems = (items, storyId) => {
  items.forEach(item => {
    getItem(item)
      .then(itemDetails => {
        if(itemDetails.type === 'pollopt') {
          PollActionCreators.receivePoll(itemDetails);
        }
        if(itemDetails.type === 'comment') {
          itemDetails.parentId = storyId;
          CommentsActionCreators.receiveComment(itemDetails)
        }
        if(itemDetails && itemDetails.kids && itemDetails.kids.length > 0) {
          getItems(itemDetails.kids, storyId);
        }
      });
  });
};

var getItem = (item) => {
  return new Promise((resolve, reject) => {
    fb.child('item').child(item).on('value',
      snapshot => resolve(snapshot.val()),
      err => reject(err)
    );
  });
};

var getUser = (userId) => {
  return new Promise((resolve, reject) => {
    fb.child('user').child(userId).on('value',
      snapshot => resolve(snapshot.val()),
      err => reject(err));
  });
};

var getTopStories = (stories) => {
  var promisesArr = [];

  stories.map(story => {
    var p = new Promise((resolve, reject) => {
      fb.child('item').child(story).on('value',
        snapshot => resolve(snapshot.val()),
        err => reject(err)
      );
    });
    promisesArr.push(p);
  });

  return Promise
    .settle(promisesArr)
    .map(story => story.value());
};

var getParent = (item) => {
  return new Promise((resolve, reject) => {
    fb.child('item').child(item).on('value',
      snapshot => {
        if(snapshot.val().type === 'story') {
          resolve(snapshot.val());
        }
        else if(snapshot.val().type === 'poll') {
          resolve(snapshot.val());
        }
        else {
          resolve(getParent(snapshot.val().parent));
        }
      },
      err => reject(err));
  });
};

ReacterNewsWebAPIUtils = {

  getTopStoriesAndComments: () => {
    StoriesActionCreators.clearStories();
    StoriesActionCreators.setLoading();
    getAllTopStoriesKeys()
      .then(getTopStories)
      .then(topStoriesArray => topStoriesArray.filter(story => !story.deleted))
      .then(topStoriesArray => {
          StoriesActionCreators.receiveStories(topStoriesArray);
          return topStoriesArray;
      })
      .then(topStoriesArray => {
        topStoriesArray.forEach(story => {
          if(story.kids && story.kids.length > 0) {
            getItems(story.kids, story.id);
          }
        });
      })
      .then(StoriesActionCreators.stopLoading)
  },

  getStory: (storyId) => {
    StoriesActionCreators.setLoading();
    getItem(storyId)
      .then(story => {
        StoriesActionCreators.receiveStory(story);
        if(story.parts && story.parts.length > 0) {
          getItems(story.parts);
        }
        if(story.kids && story.kids.length > 0) {
          getItems(story.kids, story.id);
        }
        StoriesActionCreators.stopLoading();
      });
  },

  getUser: (userId) => {
    UserActionCreators.setLoading();
    getUser(userId)
      .then(UserActionCreators.receiveUser)
      .then(UserActionCreators.stopLoading);
  },

  getUserSubmissions: (userId, page) => {
    var start = 30 * (page-1);
    var end = (start + 30);
    StoriesActionCreators.setSubmittedLoading();
    StoriesActionCreators.clearSubmittedStories();
    UserActionCreators.setLoading();
    getUser(userId)
      .then(userDetails => {
        UserActionCreators.receiveUser(userDetails);
        UserActionCreators.stopLoading();
        return userDetails.submitted;
      })
      .then(getTopStories)
      .then(submittedItems => {
        return submittedItems
          .filter(item => item && (item.type === 'story' && !item.deleted))
          .slice(start, end);
      })
      .then(stories => {
        StoriesActionCreators.receiveSubmittedStories(stories);
        stories.forEach(story => {
          if(story.kids && story.kids.length > 0) {
            getItems(story.kids, story.id);
          }
        });
      })
      .then(StoriesActionCreators.stopSubmittedLoading);
  },

  getUserComments: (userId) => {
    UserActionCreators.setLoading();
    CommentsActionCreators.setLoading();
    getUser(userId)
      .then(userDetails => {
        UserActionCreators.receiveUser(userDetails);
        UserActionCreators.stopLoading();
        return userDetails.submitted;
      })
      .then(getTopStories)
      .then(submittedItems => {
        return submittedItems
          .filter(item => item && (item.type === 'comment' && !item.deleted));
      })
      .then(comments =>{
        comments.forEach(comment => {
          getParent(comment.parent)
          .then(parentResult =>{
              comment.parentId = comment.parent;
              comment.parentStoryDetails = parentResult;
              CommentsActionCreators.receiveComment(comment);

              if(comment.kids && comment.kids.length > 0) {
                getItems(comment.kids, comment.parent);
              }
            });
        });
      })
      .then(CommentsActionCreators.stopLoading);
  }

};

module.exports = ReacterNewsWebAPIUtils;