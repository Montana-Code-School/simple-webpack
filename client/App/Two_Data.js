var React = require('react');
var Two_Display = require('./Two_Display')

var Two_Data = React.createClass({
  getInitialState: function() {
    return {
      dataTwo: null
    }
  },
  get_Select_Data: function() {
    console.log("About to get dd 2 data");
    var self = this;
    $.ajax({
      url: '/api/dropDownTwo/' + this.props.urlKey,
      method: 'Get',
    }).done(function(data){
      self.setState({ dataTwo: data })
    })
  },
  onSelectionChange: function(event){
    this.props.updateTwoSelection(event.target.value);
  },
  componentDidMount: function(){
    this.get_Select_Data();
  },
  render: function() {
    return this.state.dataTwo ? <Two_Display onSelectionChange={this.onSelectionChange} csData={this.state.dataTwo}/> : null
  }
});

module.exports = Two_Data;