var React = require('react');

var LoaderComponent = React.createClass({
  render: function() {
    return (
      <div className='spinner-center'>
        <i className='fa fa-refresh fa-spin'></i>
      </div>
    );
  }
});

module.exports = LoaderComponent;
