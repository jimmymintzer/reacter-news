var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var SpacerComponent = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return (
      <div className='spacer'></div>
    )
  }
});

module.exports = SpacerComponent;