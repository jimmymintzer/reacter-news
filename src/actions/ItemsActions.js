import { dispatch } from '../AppDispatcher';
import Constants from '../constants/ReacterNewsConstants';
import { getKeys, getItem, getItems } from '../utils/ReacterNewsWebAPIUtils';
import { getStartIndex, NUM_PER_PAGE } from '../utils/CommonUtils';

async function getGenericItems(page, type, constant) {
  dispatch({
    type: Constants.ITEMS_LOADING,
  });

  const keys = await getKeys(type);
  const start = getStartIndex(page);
  const items = await getItems(keys.splice(start, NUM_PER_PAGE));

  dispatch({
    type: constant,
    action: {
      items,
      page,
    },
  });

  dispatch({
    type: Constants.ITEMS_FINISH_LOADING,
  });
}

async function getRecursiveItems(kids) {
  if (kids) {
    const itemVals = await getItems(kids);

    itemVals.forEach(async function(item) {
      if (item.kids) {
        await getRecursiveItems(item.kids);
      }
    });

    dispatch({
      type: Constants.SET_ITEMS,
      action: {
        items: itemVals,
      },
    });
  }
}

export async function getItemInfo(id) {
  dispatch({
    type: Constants.ITEMS_LOADING,
  });

  const item = await getItem(id);

  if (item.kids) {
    getRecursiveItems(item.kids);
  }

  dispatch({
    type: Constants.SET_ITEM,
    action: {
      item,
    },
  });

  dispatch({
    type: Constants.ITEMS_FINISH_LOADING,
  });
}

export async function getTopStories(page) {
  getGenericItems(page, 'topstories', Constants.SET_TOP_STORIES);
}

export async function getNewStories(page) {
  getGenericItems(page, 'newstories', Constants.SET_NEW_STORIES);
}

export async function getAskStories(page) {
  getGenericItems(page, 'askstories', Constants.SET_ASK_STORIES);
}

export async function getJobStories(page) {
  getGenericItems(page, 'jobstories', Constants.SET_JOB_STORIES);
}

export async function getShowStories(page) {
  getGenericItems(page, 'showstories', Constants.SET_SHOW_STORIES);
}
