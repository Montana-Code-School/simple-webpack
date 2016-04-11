var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/finalcropcircles')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var XLSX = require('xlsx');

var Location = require('./models/locations');
var City = require('./models/cities');


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

//XCEL PARSER STUFF

// var workbook = XLSX.readFile('CRWB.xlsx');
// var first_sheet_name = workbook.SheetNames[0];
// var locationKey = 'B7';

// /* Get worksheet */
// var worksheet = workbook.Sheets[first_sheet_name];

// /* Find desired cell */
// var desired_cell = worksheet[locationKey].v;

// var globs = [];
// var cities = [];

// for (var i = 6; i < 3694; i++) {
//   if (worksheet['E'+ i].v.toString().trim().charAt(0) != '0' && worksheet['E'+ i].v.toString().trim() != 'All Other'.toString().trim()) {
//     var city = {};
//     city.cityName = worksheet['E'+ i].v;
//     city.cityKey = worksheet['D'+ i].v;
//     cities.push(city)
//   };
// };

// cities.forEach(function(item){
//   var city = new City();
//   city.name = item.cityName.trim();
//   city.key = item.cityKey.trim();
//   city.save();
// });

// for (var i = 7; i < 3694; i++) {
//   if(worksheet['B'+ i].v.charAt(worksheet['B'+ i].v.length -1) != '0'){
//       var glob = {};
//       var tempKey = worksheet['B'+ i].v.slice().slice(0,3).trim() +  worksheet['B'+ i].v.slice().slice(3,7).trim();
//       glob.locationKey = worksheet['B'+ i].v;
//       glob.cty = worksheet['B'+ i].v.slice().slice(0,3).trim();
//       glob.twp = worksheet['B'+ i].v.slice().slice(3,7).trim();
//       glob.ctyTwp = worksheet['B'+ i].v.slice().slice(0,3).trim() + worksheet['B'+ i].v.slice().slice(3,7).trim();
//       glob.rge = worksheet['B'+ i].v.slice().slice(7).trim();
//       glob.wheat = [ { 'Basic': worksheet['H' + i].v },  { 'DXS5': worksheet['I'+ i].v },  { 'DDA': worksheet['J' + i].v },   { 'DXS1': worksheet['K' + i].v },   { 'DD20': worksheet['L' + i].v },  { 'XS20IP': worksheet['M' + i].v },  { '80MIN': worksheet['N' + i].v } ];
//       glob.barley = [ { 'Basic': worksheet['P' + i].v },  { 'DXS5': worksheet['Q'+ i].v },  { 'DDA': worksheet['R' + i].v },   { 'DXS1': worksheet['S' + i].v },   { 'DD20': worksheet['T' + i].v },  { 'XS20IP': worksheet['U' + i].v },  { '80MIN': worksheet['V' + i].v } ];
//       globs.push(glob);
//     }
// };


// globs.forEach(function(item){
//   var location = new Location({
//     locationKey: item.locationKey.trim(),
//     cty: item.cty.trim(),
//     ctyTwp: item.ctyTwp.trim(),
//     twp: item.twp.trim(),
//     rge: item.rge.trim(),
//     wheat: item.wheat,
//     barley: item.barley,
//     firstKey: item.cty.trim() + item.twp.trim(),
//   });
//   location.save();
// });

app.use('/img', express.static('img'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/dropDownOne', function(req, res){
  City.find(function(err, cities){
    res.json(cities)
  })
});

app.get('/api/locations', function(req, res){
  Location.find(function(err, locations){
    res.json(locations)
  })
});

app.get('/api/finalLocation/:key', function(req, res){
  Location.find({ locationKey: req.params.key }, function(err, location){
    res.json(location);
  })
});

app.get('/api/dropDownTwo/:key', function(req, res){
  console.log(req.params.key,'inside req  params key dd two');
  Location.find({ cty: req.params.key }, function(err, locations){
    res.json(locations)
  })
});

app.get('/api/dropDownThree/:key', function(req, res){
  Location.find({ firstKey: req.params.key }, function(err, locations){
    res.json(locations);
  })
});

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 fired up 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 \n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 on " + port + " 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥")
});
