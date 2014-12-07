var React = require('react');
var StoryComponent = require('./StoryComponent');

var StoriesComponent = React.createClass({
  render: function() {
    var href = "http://www.forbes.com/sites/mfonobongnsehe/2014/12/01/nigerian-billionaire-tony-elumelu-commits-100-million-to-create-10000-african-entrepreneurs-in-10-years/";
    var title = "Nigerian Billionaire Commits $100M to Create African Entrepreneurs";
    var comhead = "forbes.com";
    var points = 77;
    var user = "nreece";
    var time = "4 hours ago";
    var item = "8710448";
    var numberOfComments = 24;
    return (
      <div className="main">
        <ol className="stories">
          <li>
            <StoryComponent href={href} title={title} comhead={comhead} points={points} user={user} time={time} item={item} numberOfComments={numberOfComments}/>
          </li>
        </ol>
      </div>
    )
  }
});

module.exports = StoriesComponent;