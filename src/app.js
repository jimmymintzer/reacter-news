var React = require('react');
var ReacterNewsApp = require('./components/ReacterNewsApp');
var ReacterNewsWebAPIUtils = require('./utils/ReacterNewsWebAPIUtils');

ReacterNewsWebAPIUtils.getAllMessages();

React.render(<ReacterNewsApp />, document.getElementById('container'));