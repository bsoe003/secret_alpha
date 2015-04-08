// DEPENDENCIES
var express = require('express'),
    http = require('http'),
    path = require('path'),
    handlebars = require('express-handlebars'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    dotenv = require('dotenv'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy,
    app = express();

// CONTROLLERS
var index = require('./controllers/index');

// DATABASE
/*var database_uri = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/grouptyme'
mongoose.connect(database_uri);
mongoose.connection.on('error', console.error.bind(console, 'Connection Error: '));
mongoose.connection.once('open', function callback() {
    console.log("MongoDB Connected");
});*/

//ENV CONFIG
dotenv.load();

// PASSPORT CONFIG
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
/*passport.use(new GoogleStrategy({
    returnURL: 'http://www.example.com/auth/google/callback',
    realm: 'http://www.example.com/'
  },
  function(identifier, profile, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }
));*/

// HANDLEBAR CONFIG
app.engine('html', handlebars());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// ROUTE MAPPING
app.get('/', index.view);
app.get('/login', function(req, res) {
    res.render('login', {
        user: req.user
    });
});
app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
}));
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// START
app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
