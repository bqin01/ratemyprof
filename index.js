var express = require("express");
var bodyParser = require("body-parser");
var rmp = require("rmp-api");

var app = express();

app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());

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

app.listen(process.env.PORT || 8765);
console.log("We out here at port " + (process.env.PORT || 8765));
