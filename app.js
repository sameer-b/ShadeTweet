var express = require('express');
var aggregator = require('./lib/aggregateTweets.js');
var path = require('path');
var formidable = require("formidable");

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/**
 * Display the home page of the application.
 */

app.get('/', function (req, res) {
    res.render('index');
});


/**
 * Once we get the keywords we will query Twitter.
 */
app.post('/mapTweets', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var locations = ["38.405178,-90.065918,1000mi","40.744656,-111.873779,1600mi"];
       aggregator.getTweetRatio(fields.idea,fields.firstHashTag,fields.secondHashTag,locations,res);
    });
});

/**
 * Creating the server for our application.
 * @type {http.Server}
 */

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log('Tweet Shade listening at http://%s:%s', host, port)

});