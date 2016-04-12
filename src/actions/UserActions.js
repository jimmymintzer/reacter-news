import { dispatch } from '../AppDispatcher';
import Constants from '../constants/ReacterNewsConstants';
import { getUser, getItems } from '../utils/ReacterNewsWebAPIUtils';

export async function getUserSubmissions(id) {
  dispatch({
    type: Constants.USER_LOADING,
  });

  const user = await getUser(id);
  const { submitted } = user;

  if (submitted) {
    const submittedItems = await getItems(submitted);
    user.submitted = submittedItems;

    dispatch({
      type: Constants.SET_USER_SUBMISSIONS,
      action: {
        user,
      },
    });

    dispatch({
      type: Constants.USER_FINISH_LOADING,
    });
  } else {
    dispatch({
      type: Constants.USER_FINISH_LOADING,
    });
  }
}

export async function getUserInfo(id) {
  dispatch({
    type: Constants.USER_LOADING,
  });

  const user = await getUser(id);

  dispatch({
    type: Constants.SET_USER_INFO,
    action: {
      user,
    },
  });

  dispatch({
    type: Constants.USER_FINISH_LOADING,
  });
}
