var express = require("express");
var bodyParser = require("body-parser");
var rmp = require("rmp-api");

var app = express();

app.use(express.static('public'));
app.get('/', function(req, res){
  res.render("index.pug");
});

app.listen(process.env.PORT || 8888);
console.log("We out here at port " + (process.env.PORT || 8888));
