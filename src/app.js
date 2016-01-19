import React, { Component } from 'react';
const HeaderComponent = require('./components/common/HeaderComponent');
// import { Route, Link } from 'react-router';
require('../scss/styles.scss');
require('../node_modules/font-awesome/scss/font-awesome.scss');

export default class App extends Component {
  render() {
    // var routeName = this.getRoutes().reverse()[0].name;
    // var queryString = this.getQuery() || '';
    // var keyName = (this.getRoutes().reverse()[0].name || 'news') +
    // (this.getQuery().p || '') + (this.getQuery().id || '');
    const routeName = '';
    const queryString = '';

    return (
      <div>
        <HeaderComponent name={routeName} queryString={queryString}/>
        {this.props.children}
      </div>
    );
  }
}
