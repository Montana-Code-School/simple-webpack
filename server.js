var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/finalcropcircles')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var Message = require('./models/chat');



if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');

  app.use('/static', express.static('static'));
} else {
  // When not in production, enable hot reloading

  var chokidar = require('chokidar');
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.dev');
  var compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}


app.use('/img', express.static('img'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/messages', function(req, res){
  var message = new Message({
    message: req.body.message
  });
  message.save(function(err, message){
    if(err){
      res.status(500).send(err, 'Something broke!');
    } else {
      res.json(message)
    }
  })
});

app.get('/messages', function(req, res){
  Message.find(function(err, messages){
    if(err){
      res.status(500).send(err, 'Something broke!');
    } else {
      res.json(messages)
    }
  })
});


var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 fired up 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 \n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 on " + port + " 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥")
});
