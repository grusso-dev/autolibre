const express = require('express');
const session = require('express-session');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require("./database/models");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/product');
const profileRouter = require('./routes/users');
const resultsRouter = require('./routes/results');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'myApp',
  resave: false,
  saveUninitialized: true,
}))
;

app.use(function(req, res, next) {
  if (req.session.user != undefined) {
    res.locals.user = req.session.user;
  }
  return next()
});

app.use(function(req, res, next) {
  if (req.cookies.userId != undefined && req.session.user == undefined) {
      let id = req.cookies.userId;

      db.Usuario.findByPk(id)
      .then(function(result) {

        req.session.user = result;
        res.locals.user = result;

        return next(); 
      })
      .catch(function(err) {
        return console.log(err); ; 
      });
  } 
  else {
    return next()
  }
});
// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/profile', profileRouter);
app.use('/search-results', resultsRouter);

// Manejo de errores
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
