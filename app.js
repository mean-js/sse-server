var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');

var app = express();

// Configuration
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


app.use("/", require("./app-route"));


app.listen(3010, function() {
    console.log("Server Started...");
});