import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default function connectToStores(OriginalComponent, stores, getState) {
  return class StoreConnector extends Component {

    constructor(props) {
      super(props);

      this.state = getState(props);
    }

    componentWillMount() {
      stores.forEach(store => store.addChangeListener(this.handleStoresChanged));
    }

    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }

    componentWillUnmount() {
      stores.forEach(store => store.removeChangeListener(this.handleStoresChanged));
    }

    handleStoresChanged = () => {
      this.setState(getState(this.props));
    };

    render() {
      return <OriginalComponent {...this.props} {...this.state} />;
    }
  };
}
