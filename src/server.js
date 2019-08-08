const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// importing routes
const indexRoutes = require('./routes/route');

// settings
app.set('port', process.env.PORT || 3500);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(express.urlencoded({extended: false}))

// routes
app.use('/', indexRoutes);
app.use(express.static("public"))

//Run server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
