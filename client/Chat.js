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

  handleSubmit: function(e) {
    e.preventDefault();

    var msg = { message: this.state.message.trim() };

    this.props.submitMessage(msg, function (err) {
      console.log("message submitted")
    });

    
  },
  render: function() {
    return (
      <div className="container myContainer">
      <form onSubmit={ this.handleSubmit }>

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
      if(this.props.messages) {
        var messages = this.props.messages.map(function(item){
          return <p> { item.message } </p>
        });
      } else {
        var messages = "Loadinggg"
      };
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
  submitMessage: function (message, callback) {
    this.socket.emit('newMessage', message, function (err) {
      if (err)
        return console.error('New message error:', err);
      callback();
    });
  },
  componentDidMount: function(){
    var self = this;
    this.socket = io();
    this.socket.on('messages', function (messages) {
      self.setState({ messages: messages });
    });
    this.socket.emit('fetchMessages');
  },
  render: function() {
    var messages = this.state.messages ? <MessageList messages={this.state.messages}/> : null
    return (
      <div className="jumbotron">
        { messages }
        <MessageForm submitMessage={this.submitMessage}/>
      </div>
      );
  }
});

module.exports = Chat;