import { dispatch } from '../AppDispatcher';
import Constants from '../constants/ReacterNewsConstants';
import { getUser } from '../utils/ReacterNewsWebAPIUtils';

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
