var React = require('react');
var ReactDom = require('react-dom');
var Chat = require('./Chat');

require('./stylesheets/main.scss');


var App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <h1> Hello, world! </h1>
        <Chat />
      </div>
      );
  }
});

ReactDom.render(
  <App />, document.getElementById('app')
);
