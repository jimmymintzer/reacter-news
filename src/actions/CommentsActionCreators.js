import ReacterNewsDispatcher from '../dispatcher/ReacterNewsDispatcher';
import { ActionTypes } from '../constants/ReacterNewsConstants';
import { getItems } from '../utils/ReacterNewsWebAPIUtils';

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

export async function getComments(kids) {
  console.log('getComments', kids);
  const result = await getItems(kids);
  console.log('result', result);
}
