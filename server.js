// DEPENDENCIES
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express-handlebars');
var mongoose = require('mongoose');
var config = require('./config');
var app = express();

// CONTROLLERS
var index = require('./controllers/index');

// DATABASE
/*var database_uri = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/grouptyme'
mongoose.connect(database_uri);
mongoose.connection.on('error', console.error.bind(console, 'Connection Error: '));
mongoose.connection.once('open', function callback() {
    console.log("MongoDB Connected");
});*/

// HANDLEBAR CONFIG
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.view);

// START
app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
