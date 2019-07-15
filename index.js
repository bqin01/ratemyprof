var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var rmp = require("rmp-api");
var mongoose = require("mongoose");

var uriloc = './database/mongooseuri.txt';
var mongoconfig = "";
try{
  mongoconfig = fs.readFileSync(uriloc, 'utf8');
}
catch(err){
  console.log('Could not find file ' + uriloc + ': ' + err);
  mongoconfig = "mongodb://localhost:27107/Professor";
}
var uri = process.env.MONGODB_URI || mongoconfig;
var port = 8765;
var app = express();

mongoose.connect(uri, {useNewUrlParser: true});
var profSchema = new mongoose.Schema({
  fname: {
    type: String,
    lowercase: true,
    required: true
  },
  lname: {
    type: String,
    lowercase: true,
    required: true
  },
  instit: {
    type: String,
    lowercase: true,
    required: true
  },
  depart: {
    type: String,
    lowercase: true
  },
  quality: Number,
  difficulty: Number,
  takeagain: Number
});
var connection = mongoose.connection;
connection.on('error', function(err) {
  console.log('Error connecting to ' + uri + ': ' + err);
});
connection.once('open', function(){
  console.log('Successfully connected to MongoDB.');
});

app.use(express.static('public'));

app.get('/', function(req, res){
  res.render("index.pug");
});

app.get('/query', function(req, res){
  var fname = req.query.fnameprof;
  var lname = req.query.lnameprof;
  var instit = req.query.instit;
  var depart = req.query.depart;
  var quality = isNaN(req.query.quality)?'-':req.query.quality;
  var difficulty = isNaN(req.query.difficulty)?'-':req.query.difficulty;
  var takeagain = isNaN(req.query.takeagain)?'-':req.query.takeagain;
  var naenable = (req.query.naenable=='on');
  res.render("query.pug", {
    fname: fname,
    lname: lname,
    instit: instit,
    depart: depart,
    quality: quality,
    difficulty: difficulty,
    takeagain: takeagain,
    naenable: naenable
  });
});

app.listen(process.env.PORT || port);
console.log("We out here at port " + (process.env.PORT || port));
