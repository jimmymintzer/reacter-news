import ReacterNewsDispatcher from '../dispatcher/ReacterNewsDispatcher';
import { ActionTypes } from '../constants/ReacterNewsConstants';

export function setLoading() {
  ReacterNewsDispatcher.handleServerAction({
    type: ActionTypes.USER_LOADING,
  });
}

export function stopLoading() {
  ReacterNewsDispatcher.handleServerAction({
    type: ActionTypes.USER_FINISHED_LOADING,
  });
}

export function receiveUser(rawMessages) {
  ReacterNewsDispatcher.handleServerAction({
    type: ActionTypes.RECEIVE_USER,
    rawMessages,
  });
}
