var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var LoaderComponent = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return (
      <div className='spinner-center'>
        <i className='fa fa-refresh fa-spin'></i>
      </div>
    );
  }
});

module.exports = LoaderComponent;