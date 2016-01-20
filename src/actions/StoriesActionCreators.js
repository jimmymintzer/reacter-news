import ReacterNewsDispatcher from '../dispatcher/ReacterNewsDispatcher';
import { ActionTypes } from '../constants/ReacterNewsConstants';

export function setLoading() {
  ReacterNewsDispatcher.handleServerAction({
    type: ActionTypes.STORIES_LOADING,
  });
}

export function stopLoading() {
  ReacterNewsDispatcher.handleServerAction({
    type: ActionTypes.STORIES_FINISHED_LOADING,
  });
}

export function clearStories() {
  ReacterNewsDispatcher.handleServerAction({
    type: ActionTypes.CLEAR_STORIES,
  });
}

export function setSubmittedLoading() {
  ReacterNewsDispatcher.handleServerAction({
    type: ActionTypes.SUBMITTED_STORIES_LOADING,
  });
}

export function stopSubmittedLoading() {
  ReacterNewsDispatcher.handleServerAction({
    type: ActionTypes.SUBMITTED_STORIES_FINISHED_LOADING,
  });
}

export function clearSubmittedStories() {
  ReacterNewsDispatcher.handleServerAction({
    type: ActionTypes.CLEAR_SUBMITTED_STORIES,
  });
}

export function receiveStories(rawStories) {
  ReacterNewsDispatcher.handleServerAction({
    type: ActionTypes.RECEIVE_RAW_STORIES,
    rawStories,
  });
}

export function receiveStory(rawStory) {
  ReacterNewsDispatcher.handleServerAction({
    type: ActionTypes.RECEIVE_RAW_STORY,
    rawStory,
  });
}

export function receiveSubmittedStories(rawStories) {
  ReacterNewsDispatcher.handleServerAction({
    type: ActionTypes.RECEIVE_RAW_SUBMITTED_STORIES,
    rawStories,
  });
}
