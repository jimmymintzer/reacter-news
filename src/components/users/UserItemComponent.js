var React = require('react');
var moment = require('moment');

var UserItemComponent = React.createClass({
  render: function() {
    var id = this.props.user && this.props.user.id || "";
    if(this.props.user && this.props.user.created) {
      var created = moment(this.props.user.created * 1000);
      var current = moment();

      var numberOfDays = current.diff(created, 'days');
      var days = (numberOfDays === 1) ? ' day ago' : ' days ago';
      var createdAt = numberOfDays + days;
    }

    var karma = this.props.user && this.props.user.karma;

    document.title = "Profile: " + id + " | Reacter News";
    return (
      <table>
        <tr>
          <td>user:</td>
          <td>{id}</td>
        </tr>
        <tr>
          <td>created:</td>
          <td>{createdAt}</td>
        </tr>
        <tr>
          <td>karma:</td>
          <td>{karma}</td>
        </tr>
      </table>
    );
  }
});

module.exports = UserItemComponent;