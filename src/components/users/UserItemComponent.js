var React = require('react');
var moment = require('moment');

var buildCreatedDate = function(created) {
  if(created === 0) {
    return;
  }
  var created = moment.unix(created);
  var current = moment();

  var numberOfDays = current.diff(created, 'days');
  var days = (numberOfDays === 1) ? ' day ago' : ' days ago';
  return numberOfDays + days;
};

var UserItemComponent = React.createClass({
  getDefaultProps: function() {
    return {
      user: {
        about: "",
        created: 0,
        delay: 0,
        id: "",
        karma: 0,
        submitted: []
      }
    };
  },
  render: function() {

    document.title = "Profile: " + this.props.user.id + " | Reacter News";

    var createdAt = buildCreatedDate(this.props.user.created);
    var id = this.props.user.id;
    var karma = this.props.user.karma;
    var about = this.props.user.about;

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
        <tr>
          <td>about:</td>
          <td dangerouslySetInnerHTML={{__html: about}}></td>
        </tr>
        <tr>
          <td></td>
          <td><a href="#" className="underline">submissions</a></td>
        </tr>
        <tr>
          <td></td>
          <td><a href="#" className="underline">comments</a></td>
        </tr>
      </table>
    );
  }
});

module.exports = UserItemComponent;