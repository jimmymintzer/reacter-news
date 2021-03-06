import 'es6-promise';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { createHistory, createHashHistory } from 'history';
import { useScrollToTop } from 'scroll-behavior';

import Root from './Root';

const history = useScrollToTop(createHashHistory)({ queryKey: false });

ReactDOM.render(<Root history={history} />, document.getElementById('root'));
