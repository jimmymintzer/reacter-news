import { PayloadSource } from '../constants/ReacterNewsConstants';
import { Dispatcher } from 'flux';
import assign from 'object-assign';

const ReacterNewsDispatcher = assign(new Dispatcher(), {

  handleServerAction(action) {
    const payload = {
      source: PayloadSource.SERVER_ACTION,
      action,
    };
    this.dispatch(payload);
  },

});

export default ReacterNewsDispatcher;
