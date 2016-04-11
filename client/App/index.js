var React = require('react');
var ReactDOM = require('react-dom');
var MainDropDownBox = require('./MainDropDownBox');

require('../stylesheets/main.scss');

var MainApp = React.createClass({
  render: function() {
    return (
      <div>
        <MainDropDownBox/>
      </div>
      );
  }
});

ReactDOM.render(
  <MainApp />, document.getElementById('app')
);