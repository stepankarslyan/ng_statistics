var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.listen(8989);

app.use(express.static(__dirname + '/public'));
app.use('/lib', express.static(__dirname + "/bower_components"));
app.use(bodyParser());

var statistics = [{taskName: "Test1", startDate: "12:30:30"},{taskName: "Test2", startDate: "12:36:45"}];

app.get("/statistics", function(req, res) {
  res.send(JSON.stringify(statistics));
});

console.log("Server running on port 8989");
