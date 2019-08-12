const path = require('path');
const express = require('express');
const app = express();
<<<<<<< HEAD
=======
var server = require('http').createServer(app);
var io = require('socket.io')(server);
>>>>>>> c97c2ee50bccf9fe8f1ed05bdbb7b82fcd2d2b6d
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
<<<<<<< HEAD
app.use(express.static("public"));

//Run server
app.listen(app.get('port'), () => {
=======
app.use(express.static("public"))

io.on('connection', function (socket) {
  socket.on('bar', () => {
    socket.emit('bar_data', {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Productos más vendidos',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [22.5, 45.2, 40, 26.3, 85.0, 47.1, 32.2]
        }]
      },
      responsive: true,

      // Configuration options go here
      options: {}
    })
  })
})

//Run server
server.listen(app.get('port'), () => {
>>>>>>> c97c2ee50bccf9fe8f1ed05bdbb7b82fcd2d2b6d
  console.log(`server on port ${app.get('port')}`);
});