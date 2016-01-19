import 'es6-promise';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { createHistory, createHashHistory } from 'history';
import Root from './Root';

const history = process.env.NODE_ENV === 'product' ?
  createHashHistory() : createHistory();

ReactDOM.render(<Root history={history} />, document.getElementById('root'));
