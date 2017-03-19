// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs'); 
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

app.get("/letter1.doc", function (request, response) {
        response.sendFile(__dirname + '/views/my-cool-page.html'); 
        });

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

app.post("/letters", function(request, response) {  
  
  // This depends on body-parser
  var year = request.body.year; 
  console.log("Requested year="+year); 
  
  var filename = __dirname + '/views/letters/' + year + ".html"; 
  console.log("Letter filenme="+filename); 
  var text = fs.readFileSync(filename, 'utf8'); 
  console.log(text); 
  
  response.write(text); 
  response.send(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
