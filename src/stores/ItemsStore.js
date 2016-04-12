import { register } from '../AppDispatcher';
import Constants from '../constants/ReacterNewsConstants';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import { Map, List } from 'immutable';

const CHANGE_EVENT = 'change';

let _items = new Map({
  topstories: new Map(),
  newstories: new Map(),
  showstories: new Map(),
  askstories: new Map(),
  jobstories: new Map(),
  comments: new Map(),
  items: new List(),
});
let _loading = Boolean(false);

const startLoading = () => {
  _loading = Boolean(true);
};

const stopLoading = () => {
  _loading = Boolean(false);
};

const setItems = (action, type) => {
  const { items, page } = action;

  _items = _items.setIn([type, page], new List(items));
};

const setItem = (action, type) => {
  const { item } = action;
  _items = _items.updateIn([type], list => list.concat(item));
};

const sortTime = (a, b) => {
  if (a.time < b.time) {
    return 1;
  }
  if (a.time > b.time) {
    return -1;
  }
  return 0;
};

const ItemsStore = assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getLoadingStatus: () => _loading,

  getItem: (id) => _items.get('items').filter(item => item.id === id).first(),

  getGenericItems: () => _items.get('items').toJS(),

  getItems: (page, type, sort) => {
    const itemsType = _items.get(type);
    let items = itemsType.get(page);

    if (items && !!sort) {
      items = items.sort(sortTime);
    }

    return (items) ? items.toJS() : [];
  },

});

ItemsStore.dispatchToken = register(payload => {
  const { type, action = {} } = payload;

  switch (type) {
    case Constants.ITEMS_LOADING:
      startLoading();
      ItemsStore.emitChange();
      break;
    case Constants.ITEMS_FINISH_LOADING:
      stopLoading();
      ItemsStore.emitChange();
      break;
    case Constants.SET_TOP_STORIES:
      setItems(action, 'topstories');
      ItemsStore.emitChange();
      break;
    case Constants.SET_NEW_STORIES:
      setItems(action, 'newstories');
      ItemsStore.emitChange();
      break;
    case Constants.SET_SHOW_STORIES:
      setItems(action, 'showstories');
      ItemsStore.emitChange();
      break;
    case Constants.SET_ASK_STORIES:
      setItems(action, 'askstories');
      ItemsStore.emitChange();
      break;
    case Constants.SET_JOB_STORIES:
      setItems(action, 'jobstories');
      ItemsStore.emitChange();
      break;
    case Constants.SET_ITEM:
      setItem(action, 'items');
      ItemsStore.emitChange();
      break;
    default:
      break;
  }
});

export default ItemsStore;
