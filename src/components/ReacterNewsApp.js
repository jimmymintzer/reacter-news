var React = require('react');
var HeaderComponent = require('./HeaderComponent');
var StoriesComponent = require('./StoriesComponent');
var SpacerComponent = require('./SpacerComponent');
var FooterComponent = require('./FooterComponent');

var ReacterNewsApp = React.createClass({
  render: function() {
    return (
      <div>
        <HeaderComponent />
        <StoriesComponent />
        <SpacerComponent />
        <FooterComponent />
      </div>
    )
  }
});

module.exports = ReacterNewsApp;