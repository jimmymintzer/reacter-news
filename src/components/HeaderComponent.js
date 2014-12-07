var React = require('react');

var HeaderComponent = React.createClass({
  render: function() {
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
              <a href="/">Reacter News</a>
            </div>
          </li>
          <li>
            <ul className="nested-list">
              <li><a href="/new">new</a></li>
              <li>|</li>
              <li><a href="/comments">comments</a></li>
              <li>|</li>
              <li><a href="/show">show</a></li>
              <li>|</li>
              <li><a href="/ask">ask</a></li>
              <li>|</li>
              <li><a href="/jobs">jobs</a></li>
              <li>|</li>
              <li><a href="/submit">submit</a></li>
            </ul>
          </li>
        </ul>
      </header>
    )
  }
});

module.exports = HeaderComponent;