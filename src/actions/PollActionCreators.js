import ReacterNewsDispatcher from '../dispatcher/ReacterNewsDispatcher';
import { ActionTypes } from '../constants/ReacterNewsConstants';

export function receivePoll(rawPolls) {
  ReacterNewsDispatcher.handleServerAction({
    type: ActionTypes.RECEIVE_RAW_POLL,
    rawPolls,
  });
}
