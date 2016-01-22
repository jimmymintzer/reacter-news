import React, { Component, PropTypes } from 'react';
import HeaderComponent from './components/HeaderComponent';
import '../scss/styles.scss';
import '../node_modules/font-awesome/scss/font-awesome.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    location: PropTypes.object,
  };

  render() {
    const pathname = this.props.location.pathname.replace('/', '');

    return (
      <div>
        <HeaderComponent pathname={pathname}/>
        {this.props.children}
      </div>
    );
  }
}
