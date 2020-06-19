const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')

require('dotenv').config()
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const store = new MongoStore({
  mongooseConnection: mongoose.connection,
  dbName: 'sessions',
  stringify: false
})

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'Yasuo ganktem',
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false},
  store,
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'public')));
app.use('/admin/editTour', express.static(path.join(__dirname, 'public')));
app.use('/admin/userUpload', express.static(path.join(__dirname, 'userUpload')));
app.use('/admin/editTour/userUpload', express.static(path.join(__dirname, 'userUpload')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

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

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true,  useUnifiedTopology: true })

module.exports = app;