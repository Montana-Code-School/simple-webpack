var React = require('React');
var One_Data = require('./One_Data');
var Two_Data = require('./Two_Data');
var Three_Data = require('./Three_Data');
var OatBox = require('./Oatbox');

var MainDropDownBox = React.createClass({
  getInitialState: function() {
    return {
      oneSelection: null,
      twoSelection: null,
      threeSelection: null,
    }
  },
  updateOneSelection: function(newVal) {
    this.setState({ oneSelection: newVal })
  },
  updateTwoSelection: function(newVal) {
    this.setState({ twoSelection: newVal })
  },
  updateThreeSelection: function(newVal) {
    this.setState({threeSelection: newVal});
  },
  showTwo: function() {
    if(this.state.oneSelection) {
      return <Two_Data updateTwoSelection={this.updateTwoSelection} urlKey={ this.state.oneSelection }/>
    } else {
      return null;
    }
  },
  showThree: function() {
    if(this.state.twoSelection) {
      console.log("trying to show drop down three")
      return <Three_Data updateThreeSelection={this.updateThreeSelection} keyOne={ this.state.oneSelection } keyTwo={ this.state.twoSelection }/>
    } else {
      return null;
    }
  },
  showOatBox: function() {
    if(this.state.threeSelection) {
      var urlKey = this.state.oneSelection + this.state.twoSelection + this.state.threeSelection;
      return <OatBox urlKey={urlKey} />
    }
  },
  render: function() {
    return (
      <div>
        <One_Data updateOneSelection={ this.updateOneSelection } />
        { this.showTwo() }
        { this.showThree() }
        { this.showOatBox() }
      </div>
      )
  }
});

module.exports = MainDropDownBox;