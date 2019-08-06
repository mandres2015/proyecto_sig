const path = require('path');
const express = require('express');
<<<<<<< HEAD
//const morgan = require('morgan');
=======
const morgan = require('morgan');
const bodyParser = require('body-parser')
>>>>>>> MODULO VENTA
const app = express();

// importing routes
const indexRoutes = require('./routes/route');

// settings
app.set('port', process.env.PORT || 3500);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
<<<<<<< HEAD
//app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
=======
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
>>>>>>> MODULO VENTA

// routes
app.use('/', indexRoutes);
app.use(express.static("public"))

//Run server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
