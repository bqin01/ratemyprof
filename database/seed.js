var mongoose = require("mongoose");
var fs = require("fs");
var async = require("async");

var uriloc = './database/mongooseuri.txt';
var mongoconfig = "";
try{
  mongoconfig = fs.readFileSync(uriloc, 'utf8');
}
catch(err){
  mongoconfig = "mongodb://localhost:27107/Professor";
}
var uri = process.env.MONGODB_URI || mongoconfig;
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
async.series([
  function(callback){
    connection.once('open', function(){
      console.log('Successfully connected to MongoDB.');
    });
    callback(null, '1');
  },
  function(callback){
    var Professor = mongoose.model('Professor', profSchema);
    console.log('Model created.');
    Professor.deleteMany({},function(err, prof){
      if(err) return console.error(err);
      console.log('All professors have been purged.');
    });
    var data = "./database/sample_profs.json";
    var info = JSON.parse(fs.readFileSync(data));
    var profstoadd = info.professors.length;
    var n = 0;
    info.professors.forEach(function(elem){
      var prof = new Professor(elem);
      prof.save(function(err,prof){
        if(err) return console.error(err);
        else{
          console.log('Successfully passed a professor: ' + prof);
          n++;
        }
        if(n >= profstoadd){
          callback(null, '2');
        }
      });
    });

  },
  function(callback){
    connection.close();
    callback(null, '3');
  }
],
function(err){
  if(err) console.error(err);
  else console.log('seed.js completed running OK.');
});
