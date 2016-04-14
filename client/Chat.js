var React = require('react');
var ReactDom = require('react-dom');

require('./stylesheets/main.scss');

var MessageForm = React.createClass({
  getInitialState: function() {
    return {
      message: null,
    }
  },
  onMessageChange: function(event){
    this.setState({ message: event.target.value })
  },
  submitMessage: function(e) {
    e.preventDefault();

    var message = {
      message: this.state.message.trim(),
    };

    var self = this;
    $.ajax({
      url: '/messages',
      method: 'POST',
      data: message
    }).done(function(data){
      self.props.loadMessagesFromServer();
    });

    this.setState({message: ''});
  },
  render: function() {
    return (
      <div className="container myContainer">
      <form onSubmit={ this.submitMessage }>

        <fieldset className="form-group">
          <input onChange={this.onMessageChange}  type="text" className="form-control"/>
        </fieldset>

        <button className="btn btn-success-outline" type="submit"> Submit </button>
      </form>
      </div>
      );
  }
});

var MessageList = React.createClass({
  render: function() {
      var messages = this.props.messages.map(function(item){
    return <p> { item.message } </p>
  });
  return (
      <div>
        { messages }
      </div>
      );
  }
});


var Chat = React.createClass({
  getInitialState: function() {
    return {
      messages: null
    }
  },
  loadMessagesFromServer: function(){
    var self = this;
    $.ajax({
      method: 'GET',
      url: '/messages'
    }).done(function(data){
      console.log(data)
      self.setState({messages: data})
    })
  },
  componentDidMount: function(){
    this.loadMessagesFromServer()
  },
  render: function() {
    var messages = this.state.messages ? <MessageList messages={this.state.messages}/> : null
    return (
      <div className="jumbotron">
        { messages }
        <MessageForm loadMessagesFromServer={this.loadMessagesFromServer}/>
      </div>
      );
  }
});

module.exports = Chat;