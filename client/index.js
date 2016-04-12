var React = require('react');
var ReactDom = require('react-dom');

require('./stylesheets/main.scss')


var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1> Hello, Harold! </h1>        
      </div>
      )
  }
})

React.render(
  <App />, document.getElementById('app')
);
