// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs'); 
var url = require('url'); 
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); 

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post("/letters", function(request, response) {  
  
  // This depends on body-parser
  // var year = request.body.year; 
    
  var query = url.parse(request.url, true).query; 
  var year = query.year; 
  console.log("Requested year="+year); 
  
  var dir = "views/letters/" + year; 
  var filesInDir = fs.readdirSync(dir); 
  var text = ""; 
  for (var i = 0; i < filesInDir.length; i++) {
    var letterfilename = filesInDir[i]; 
    console.log("Letter file: " + letterfilename); 
    text = text + fs.readFileSync(dir + "/" + letterfilename, 'utf8'); 
  } 
  
  // var filename = __dirname + '/views/letters/' + year + ".html"; 
  // console.log("Letter filenme="+filename); 
  // var text = fs.readFileSync(filename, 'utf8'); 
  
  response.writeHead(200); 
  response.write(text); 
  response.end(); 
});

// app.get("/dreams", function (request, response) {
//   response.send(dreams);
// });

// // could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
// app.post("/dreams", function (request, response) {
//   dreams.push(request.query.dream);
//   response.sendStatus(200);
// });

// // Simple in-memory store for now
// var dreams = [
//   "Find and count some sheep",
//   "Climb a really tall mountain",
//   "Wash the dishes"
// ];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
