import ReacterNewsDispatcher from '../dispatcher/ReacterNewsDispatcher';
import { ActionTypes } from '../constants/ReacterNewsConstants';

export function setLoading() {
  ReacterNewsDispatcher.handleServerAction({
    type: ActionTypes.COMMENTS_LOADING,
  });
}

export function stopLoading() {
  ReacterNewsDispatcher.handleServerAction({
    type: ActionTypes.COMMENTS_FINISHED_LOADING,
  });
}

export function receiveComment(rawComments) {
  ReacterNewsDispatcher.handleServerAction({
    type: ActionTypes.RECEIVE_RAW_COMMENT,
    rawComments,
  });
}
