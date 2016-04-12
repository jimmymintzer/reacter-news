import { Dispatcher } from 'flux';

const dispatcher = new Dispatcher();

export function register(callback) {
  return dispatcher.register(callback);
}

export function dispatch(payload) {
  const { type, action = {} } = payload;

  dispatcher.dispatch({
    type,
    action,
  });
}
