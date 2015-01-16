var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var HeaderComponent = React.createClass({
  render: function() {
    if(this.props.name === "shownew") {
      var showNewStyle = {
        display: "inline-block"
      };
    }
    else {
      var showNewStyle = {
        display: "none"
      }
    }
    if(this.props.name === "submitted") {
      var query = this.props.queryString.id;
      var queryTitle = query + "'s submissions";
      var submittedNewStyle = {
        display: "inline-block"
      };
    }
    else {
      var submittedNewStyle = {
        display: "none"
      };
    }
    return (
      <header>
        <ul>
          <li>
            <div className="logo">
              <span><a href="#">R</a></span>
            </div>
          </li>
          <li>
            <div className="heading">
              <Link to="news">Reacter News</Link>
            </div>
          </li>
          <li>
            <ul className="nested-list">
              <li><Link to="newest">new</Link></li>
              <li>|</li>
              <li><Link to="newcomments">comments</Link></li>
              <li>|</li>
              <li><Link to="show">show</Link></li>
              <li>|</li>
              <li><Link to="ask">ask</Link></li>
              <li>|</li>
              <li><Link to="jobs">jobs</Link></li>
              <li style={showNewStyle}>|</li>
              <li style={showNewStyle}><Link to="shownew">shownew</Link></li>
              <li style={submittedNewStyle}>|</li>
              <li style={submittedNewStyle}><Link to="submitted" query={{ id: query }}>{queryTitle}</Link></li>
            </ul>
          </li>
        </ul>
      </header>
    )
  }
});

module.exports = HeaderComponent;