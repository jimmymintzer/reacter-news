import Firebase from 'firebase';

const fb = new Firebase('http://hacker-news.firebaseio.com/v0/');

export const getKeys = (type) => {
  return new Promise((resolve, reject) => {
    fb.child(type).on('value',
      snapshot => resolve(snapshot.val()),
      err => reject(err)
    );
  });
};

export const getItem = (id) => {
  return new Promise((resolve, reject) => {
    fb.child('item').child(id).on('value',
      snapshot => resolve(snapshot.val()),
      err => reject(err)
    );
  });
};

export const getUser = (id) => {
  return new Promise((resolve, reject) => {
    fb.child('user').child(id).on('value',
      snapshot => resolve(snapshot.val()),
      err => reject(err));
  });
};

export const getItems = (ids) => {
  const items = ids.map(id => {
    return getItem(id);
  });
  return Promise.all(items);
};
