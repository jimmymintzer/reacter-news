import Firebase from 'firebase';
import {
  clearStories,
  clearSubmittedStories,
  receiveStories,
  receiveStory,
  receiveSubmittedStories,
  setLoading as storiesSetLoading,
  setSubmittedLoading,
  stopLoading as storiesStopLoading,
  stopSubmittedLoading,
} from '../actions/StoriesActionCreators';
import {
  receiveComment,
  setLoading as commentSetLoading,
  stopLoading as commentStopLoading,
} from '../actions/CommentsActionCreators';
import {
  receiveUser,
  setLoading as userSetLoading,
  stopLoading as userStopLoading,
} from '../actions/UserActionCreators';
import {
  receivePoll,
} from '../actions/PollActionCreators';

const fb = new Firebase('http://hacker-news.firebaseio.com/v0/');

const getAllTopStoriesKeys = () => {
  return new Promise((resolve, reject) => {
    fb.child('topstories').on('value',
      snapshot => resolve(snapshot.val()),
      err => reject(err)
    );
  });
};

const getNewestKeys = () => {
  return new Promise((resolve, reject) => {
    fb.child('newstories').on('value',
      snapshot => resolve(snapshot.val()),
      err => reject(err)
    );
  });
};

const getItems = (items, storyId) => {
  items.forEach(item => {
    getItem(item)
      .then(itemDetails => {
        if (itemDetails.type === 'pollopt') {
          receivePoll(itemDetails);
        }
        if (itemDetails.type === 'comment') {
          itemDetails.parentId = storyId;
          receiveComment(itemDetails);
        }
        if(itemDetails && itemDetails.kids && itemDetails.kids.length > 0) {
          getItems(itemDetails.kids, storyId);
        }
      });
  });
};

const getItem = (item) => {
  return new Promise((resolve, reject) => {
    fb.child('item').child(item).on('value',
      snapshot => resolve(snapshot.val()),
      err => reject(err)
    );
  });
};

const getUser = (userId) => {
  return new Promise((resolve, reject) => {
    fb.child('user').child(userId).on('value',
      snapshot => resolve(snapshot.val()),
      err => reject(err));
  });
};

const getTopStories = (stories) => {
  const promisesArr = [];

  stories.map(story => {
    const p = new Promise((resolve, reject) => {
      fb.child('item').child(story).on('value',
        snapshot => resolve(snapshot.val()),
        err => reject(err)
      );
    });
    promisesArr.push(p);
  });

  return Promise
    .all(promisesArr);
};

const getParent = (item) => {
  return new Promise((resolve, reject) => {
    fb.child('item').child(item).on('value',
      snapshot => {
        if (snapshot.val().type === 'story') {
          resolve(snapshot.val());
        } else if (snapshot.val().type === 'poll') {
          resolve(snapshot.val());
        } else {
          resolve(getParent(snapshot.val().parent));
        }
      },
      err => reject(err));
  });
};

const ReacterNewsWebAPIUtils = {

  getTopStories: () => {
    clearStories();
    storiesSetLoading();
    getAllTopStoriesKeys()
      .then(getTopStories)
      .then(topStoriesArray => topStoriesArray.filter(story => !story.deleted))
      .then(topStoriesArray => {
        receiveStories(topStoriesArray);
        return topStoriesArray;
      })
      // .then(topStoriesArray => {
      //  topStoriesArray.forEach(story => {
      //    if(story.kids && story.kids.length > 0) {
      //      getItems(story.kids, story.id);
      //    }
      //  });
      // })
      .then(storiesStopLoading);
  },

  getNewStories: () => {
    clearStories();
    storiesSetLoading();
    getNewestKeys()
      .then(getTopStories)
      .then(topStoriesArray => topStoriesArray.filter(story => story && !story.deleted))
      .then(topStoriesArray => {
        receiveStories(topStoriesArray);
        return topStoriesArray;
      })
      .then(storiesStopLoading);
  },

  getStory: (storyId) => {
    storiesSetLoading();
    getItem(storyId)
      .then(story => {
        receiveStory(story);
        if (story.parts && story.parts.length > 0) {
          getItems(story.parts);
        }
        if (story.kids && story.kids.length > 0) {
          getItems(story.kids, story.id);
        }
        storiesStopLoading();
      });
  },

  getUser: (userId) => {
    userSetLoading();
    getUser(userId)
      .then(receiveUser)
      .then(userStopLoading);
  },

  getUserSubmissions: (userId, page) => {
    const start = 30 * (page - 1);
    const end = (start + 30);
    setSubmittedLoading();
    clearSubmittedStories();
    userSetLoading();
    getUser(userId)
      .then(userDetails => {
        receiveUser(userDetails);
        userStopLoading();
        return userDetails.submitted;
      })
      .then(getTopStories)
      .then(submittedItems => {
        return submittedItems
          .filter(item => item && (item.type === 'story' && !item.deleted))
          .slice(start, end);
      })
      .then(stories => {
        receiveSubmittedStories(stories);
        stories.forEach(story => {
          if (story.kids && story.kids.length > 0) {
            getItems(story.kids, story.id);
          }
        });
      })
      .then(stopSubmittedLoading);
  },

  getUserComments: (userId) => {
    userSetLoading();
    commentSetLoading();
    getUser(userId)
      .then(userDetails => {
        receiveUser(userDetails);
        userStopLoading();
        return userDetails.submitted;
      })
      .then(getTopStories)
      .then(submittedItems => {
        return submittedItems
          .filter(item => item && (item.type === 'comment' && !item.deleted));
      })
      .then(comments => {
        comments.forEach(comment => {
          getParent(comment.parent)
          .then(parentResult => {
            comment.parentId = comment.parent;
            comment.parentStoryDetails = parentResult;
            receiveComment(comment);

            if (comment.kids && comment.kids.length > 0) {
              getItems(comment.kids, comment.parent);
            }
          });
        });
      })
      .then(commentStopLoading);
  },

};

export default ReacterNewsWebAPIUtils;
