var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');

var loginRouter = require('./routes/login');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var helloWorldRouter = require('./routes/helloworld');
var testMhavieRouter = require('./routes/test_mhavie');
var rapportRouter = require('./routes/rapport');
var rapportTableRouter = require('./routes/rapportTable');

var app = express();
global.prefix = (process.env.PREFIX) || "/";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/layout');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

app.use('/login', loginRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', helloWorldRouter);
app.use('/test', testMhavieRouter);
app.use('/rapport', rapportRouter);
app.use('/rapportTable', rapportTableRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
