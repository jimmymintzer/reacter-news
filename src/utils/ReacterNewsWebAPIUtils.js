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

const getTopStoriesKeys = () => {
  return new Promise((resolve, reject) => {
    fb.child('topstories').on('value',
      snapshot => resolve(snapshot.val()),
      err => reject(err)
    );
  });
};

const getNewestStoriesKeys = () => {
  return new Promise((resolve, reject) => {
    fb.child('newstories').on('value',
      snapshot => resolve(snapshot.val()),
      err => reject(err)
    );
  });
};

const getShowStoriesKeys = () => {
  return new Promise((resolve, reject) => {
    fb.child('showstories').on('value',
      snapshot => resolve(snapshot.val()),
      err => reject(err)
    );
  });
};

const getAskStoriesKeys = () => {
  return new Promise((resolve, reject) => {
    fb.child('askstories').on('value',
      snapshot => resolve(snapshot.val()),
      err => reject(err)
    );
  });
};

const getJobsKeys = () => {
  return new Promise((resolve, reject) => {
    fb.child('jobstories').on('value',
      snapshot => resolve(snapshot.val()),
      err => reject(err)
    );
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

export async function getTopStories() {
  try {
    await clearStories();
    await storiesSetLoading();
    const keys = await getTopStoriesKeys();
    const promises = keys.map((key) => getItem(key));
    let stories = await Promise.all(promises);
    stories = stories.filter(story => story);
    await receiveStories(stories);
    await storiesStopLoading();
  } catch (err) {
    console.log('getTopStories Error', err);
  }
}

export async function getItems(items) {
  try {
    return Promise.all(items.map(item => getItem(item)));
  } catch (err) {
    console.log('getItems Error', err);
  }
}

export async function getNewestStories() {
  try {
    await clearStories();
    await storiesSetLoading();
    const keys = await getNewestStoriesKeys();
    const promises = keys.map((key) => getItem(key));
    let stories = await Promise.all(promises);
    stories = stories.filter(story => story);
    await receiveStories(stories);
    await storiesStopLoading();
  } catch (err) {
    console.log('getNewestStories Error', err);
  }
}

export async function getShowStories() {
  try {
    await clearStories();
    await storiesSetLoading();
    const keys = await getShowStoriesKeys();
    const promises = keys.map((key) => getItem(key));
    let stories = await Promise.all(promises);
    stories = stories.filter(story => story);
    await receiveStories(stories);
    await storiesStopLoading();
  } catch (err) {
    console.log('getShowStories Error', err);
  }
}

export async function getAskStories() {
  try {
    await clearStories();
    await storiesSetLoading();
    const keys = await getAskStoriesKeys();
    const promises = keys.map((key) => getItem(key));
    let stories = await Promise.all(promises);
    stories = stories.filter(story => story);
    await receiveStories(stories);
    await storiesStopLoading();
  } catch (err) {
    console.log('getAskStories Error', err);
  }
}

export async function getJobsStories() {
  try {
    await clearStories();
    await storiesSetLoading();
    const keys = await getJobsKeys();
    const promises = keys.map((key) => getItem(key));
    let stories = await Promise.all(promises);
    stories = stories.filter(story => story);
    await receiveStories(stories);
    await storiesStopLoading();
  } catch (err) {
    console.log('getJobsStories Error', err);
  }
}

export async function getStory(id) {
  try {
    await storiesSetLoading();
    const story = await getItem(id);
    if (!story.deleted) {
      await receiveStory(story);
    }
    storiesStopLoading();
  } catch (err) {
    console.log('getStory Error', err);
  }
}

export async function getUserDetails(id) {
  try {
    await userSetLoading();
    const user = await getUser(id);
    await receiveUser(user);
    await userStopLoading();
  } catch (err) {
    console.log('getUserDetails Error', err);
  }
}

export async function getUserSubmissions(id, page) {
  try {
    const start = 30 * (page - 1);
    const end = start + 30;

    await setSubmittedLoading();
    await clearSubmittedStories();
    await userSetLoading();
    const user = getUserDetails(id);
    if (user.submitted) {
      const promises = user.submitted
        .map((key) => getItem(key))
        .slice(start, end);
      const stories = await Promise.all(promises);
      await receiveSubmittedStories(stories);
    }
    await stopSubmittedLoading();
  } catch (err) {
    console.log('getUserSubmissions', err);
  }
}


const ReacterNewsWebAPIUtils = {

  //getStory: (storyId) => {
  //  storiesSetLoading();
  //  getItem(storyId)
  //    .then(story => {
  //      receiveStory(story);
  //      if (story.parts && story.parts.length > 0) {
  //        getItems(story.parts);
  //      }
  //      if (story.kids && story.kids.length > 0) {
  //        getItems(story.kids, story.id);
  //      }
  //      storiesStopLoading();
  //    });
  //},
  //
  //getUser: (userId) => {
  //  userSetLoading();
  //  getUser(userId)
  //    .then(receiveUser)
  //    .then(userStopLoading);
  //},
  //
  //getUserSubmissions: (userId, page) => {
  //  const start = 30 * (page - 1);
  //  const end = (start + 30);
  //  setSubmittedLoading();
  //  clearSubmittedStories();
  //  userSetLoading();
  //  getUser(userId)
  //    .then(userDetails => {
  //      receiveUser(userDetails);
  //      userStopLoading();
  //      return userDetails.submitted;
  //    })
  //    .then(getTopStories)
  //    .then(submittedItems => {
  //      return submittedItems
  //        .filter(item => item && (item.type === 'story' && !item.deleted))
  //        .slice(start, end);
  //    })
  //    .then(stories => {
  //      receiveSubmittedStories(stories);
  //      stories.forEach(story => {
  //        if (story.kids && story.kids.length > 0) {
  //          getItems(story.kids, story.id);
  //        }
  //      });
  //    })
  //    .then(stopSubmittedLoading);
  //},
  //
  //getUserComments: (userId) => {
  //  userSetLoading();
  //  commentSetLoading();
  //  getUser(userId)
  //    .then(userDetails => {
  //      receiveUser(userDetails);
  //      userStopLoading();
  //      return userDetails.submitted;
  //    })
  //    .then(getTopStories)
  //    .then(submittedItems => {
  //      return submittedItems
  //        .filter(item => item && (item.type === 'comment' && !item.deleted));
  //    })
  //    .then(comments => {
  //      comments.forEach(comment => {
  //        getParent(comment.parent)
  //        .then(parentResult => {
  //          comment.parentId = comment.parent;
  //          comment.parentStoryDetails = parentResult;
  //          receiveComment(comment);
  //
  //          if (comment.kids && comment.kids.length > 0) {
  //            getItems(comment.kids, comment.parent);
  //          }
  //        });
  //      });
  //    })
  //    .then(commentStopLoading);
  //},

};

export default ReacterNewsWebAPIUtils;
