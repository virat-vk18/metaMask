var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const fileUpload = require('./routes/fileUpload')
const register = require('./routes/register')
const loginData = require('./routes/login')
const posts = require('./routes/posts')
const dbConnection = require('./config/db')
const bodyParser = require('body-parser');
// view engine setup
const whitelist = ['http://172.16.17.205:3000', 'http://localhost:3000', 'http://172.16.17.205:3001', 'http://localhost:3001'];
const corsOptions = {
  // || !origin
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
// app.use(cors())
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter)
// app.use('/users', usersRouter);
app.use('/fileupload', fileUpload)
app.use('/register', register)
app.use('/login', loginData)
app.use('/ckeditor', posts)
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
