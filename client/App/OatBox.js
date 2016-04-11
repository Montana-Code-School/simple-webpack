var React = require('react');
var ShowGrain = require('./showGrain');


var OatBox = React.createClass({
  getInitialState: function() {
    return {
      wheat: null,
      barley: null,
      showWhich: null,
    }
  },
  getGrainFromServer: function() {
    var self = this;
    $.ajax({
      url: '/api/finalLocation/' + this.props.urlKey,
      method: 'GET',
    }).done(function(data){
      self.setState({wheat: data[0].wheat});
      self.setState({barley: data[0].barley});
    })
  },
  componentDidMount: function() {
    this.getGrainFromServer()
  },
  showingGrain: function() {
    if(this.state.showWhich === 'wheat') {
      return <ShowGrain name={ "Wheat" } grain={ this.state.wheat }/>;
    } else if(this.state.showWhich === 'barley') {
      return <ShowGrain name={ "barley" } grain={ this.state.barley }/>;
    } else {
      return null;
    }
  },
  toggleGrain: function(name) {
    return this.setState({showWhich: name})
  },
  render: function() {
    return (
        <div className="container">
          <div className="btn-group">
            <button onClick={this.toggleGrain.bind(this, 'wheat')} type="button" className="btn btn-secondary-outline">Wheat</button>
            <button onClick={this.toggleGrain.bind(this, 'barley')} type="button" className="btn btn-secondary-outline">Barley</button>
            { this.showingGrain() }
          </div>
        </div>
      )
  }
});

module.exports = OatBox