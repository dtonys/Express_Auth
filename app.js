
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var dbconfig = require('./db_config');
var MongoStore = require('connect-mongo')(express);

var app = module.exports = express();


// Configuration
//mongodb
dbconfig.init();

app.configure(function(){
  app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(express.session({
    secret: 'abdef',
    store: new MongoStore({
      db: 'test'
    })
  }));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);

//serve partials (they should be staticly served)
app.get('/partials/:name', routes.partials);
app.get('/partials/login', routes.login);
app.get('/partials/register', routes.register);

// JSON API
app.get('/api/name', api.name);
app.post('/api/login', api.login);
app.post('/api/register', api.register);
app.get('/api/checkLogin', api.checkLogin);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
