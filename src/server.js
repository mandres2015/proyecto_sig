const path = require('path');
const express = require('express');
const app = express();
var session = require('express-session')

// importing routes
const indexRoutes = require('./routes/route');

// settings
app.set('port', process.env.PORT || 3500);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
//app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "mandresdeveloper",
  resave: false,
  saveUninitialized: false
}))

// routes
app.use('/', indexRoutes);
app.use(express.static("public"))

//Run server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});