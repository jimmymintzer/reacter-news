import keyMirror from 'keymirror';


export const ActionTypes = keyMirror({
  RECEIVE_RAW_STORIES: null,
  RECEIVE_RAW_SUBMITTED_STORIES: null,
  RECEIVE_RAW_STORY: null,
  RECEIVE_RAW_COMMENT: null,
  RECEIVE_RAW_POLL: null,
  RECEIVE_RAW_JOBS: null,
  STORIES_LOADING: null,
  STORIES_FINISHED_LOADING: null,
  SUBMITTED_STORIES_LOADING: null,
  SUBMITTED_STORIES_FINISHED_LOADING: null,
  CLEAR_SUBMITTED_STORIES: null,
  CLEAR_STORIES: null,
  RECEIVE_USER: null,
  USER_LOADING: null,
  USER_FINISHED_LOADING: null,
  COMMENTS_LOADING: null,
  COMMENTS_FINISHED_LOADING: null,
});

export const PayloadSource = keyMirror({
  SERVER_ACTION: null,
  VIEW_ACTION: null,
});


