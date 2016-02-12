import ReacterNewsDispatcher from '../dispatcher/ReacterNewsDispatcher';
import { ActionTypes } from '../constants/ReacterNewsConstants';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import { Map } from 'immutable';

const CHANGE_EVENT = 'change';

let _users = new Map();
let _loading = false;

const _addUser = (rawMessages) => {
  _users = _users.set(rawMessages.id, rawMessages);
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

  get: (id) => _users.get(id),

  getLoadingStatus: () => _loading,

});

UsersStore.dispatchToken = ReacterNewsDispatcher.register(payload => {
  const action = payload.action;

  switch (action.type) {
    case ActionTypes.RECEIVE_USER:
      _addUser(action.rawMessages);
      UsersStore.emitChange();
      break;
    case ActionTypes.USER_LOADING:
      _loading = true;
      UsersStore.emitChange();
      break;
    case ActionTypes.USER_FINISHED_LOADING:
      _loading = false;
      UsersStore.emitChange();
      break;
    default:
      break;
  }
});

module.exports = UsersStore;
