import { register } from '../AppDispatcher';
import Constants from '../constants/ReacterNewsConstants';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import { Map } from 'immutable';

const CHANGE_EVENT = 'change';

let _users = new Map();
let _loading = Boolean(false);

const startLoading = () => {
  _loading = Boolean(true);
};

const stopLoading = () => {
  _loading = Boolean(false);
};

const setUser = (action) => {
  const { user } = action;

  _users = _users.setIn([user.id], user);
};

const UsersStore = assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: (id) => _users.get(id) || {},

  getLoadingStatus: () => _loading,

});

UsersStore.dispatchToken = register(payload => {
  const { type, action = {} } = payload;

  switch (type) {
    case Constants.USER_LOADING:
      startLoading();
      UsersStore.emitChange();
      break;
    case Constants.USER_FINISH_LOADING:
      stopLoading();
      UsersStore.emitChange();
      break;
    case Constants.SET_USER_INFO:
      setUser(action);
      UsersStore.emitChange();
      break;
    default:
      break;
  }
});

module.exports = UsersStore;
