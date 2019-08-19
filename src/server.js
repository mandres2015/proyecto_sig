const path = require('path');
const morgan = require('morgan');
const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var session = require('express-session')
var oracle = require('./bd/oracle-db');
// const stats = require('./controllers/stats')

// importing routes
const indexRoutes = require('./routes/route');

// settings
app.set('port', process.env.PORT || 3500);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(morgan('dev'));

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "mandresdeveloper",
  resave: false,
  saveUninitialized: false
}))

// routes
app.use('/', indexRoutes);
app.use(express.static("public"))

io.on('connection', function (socket) {
  socket.on('bar', (data) => {
    oracle.connect().then(() => {
      const sql = `SELECT * FROM (
        SELECT a.nombre, b.q FROM "SYSTEM"."PRODUCTO" a, (SELECT producto, SUM(cantidad) AS q FROM "SYSTEM"."DETALLE"
        WHERE sucursal = :1 GROUP BY producto) b WHERE (a.id IN b.producto) AND a.sucursal = :1  ORDER BY b.q DESC
        ) WHERE ROWNUM <= '5'`
      var binds = [data.sucursal]
      oracle.execute(sql, binds, (err1, res1) => {
        console.log(res1.rows);
        const products = res1.rows
        var labels = []
        var values = []
        products.forEach(element => {
          labels.push(element[0])
          values.push(element[1])
        });
        socket.emit('bar_data', {
          // The type of chart we want to create
          type: 'doughnut',
          // The data for our dataset
          data: {
            labels: labels,
            datasets: [{
              label: 'Cantidad vendida',
              backgroundColor: ['#0ff', '#f00', '#0f0', '#00f', '#ff0'],
              borderColor: '#000',
              data: values
            }]
          },
          // Configuration options go here
          options: {}
        })
      })
    })
  })
  socket.on('sel', (data) => {
    oracle.connect().then(() => {
      const dateInit = new Date().getMonth() + 1
      console.log(dateInit);
      console.log(parseInt(dateInit - (data.value - 1)));
      const sql2 = `SELECT sucursal, SUM(total)as total,EXTRACT(month FROM fecha) as mes FROM "SYSTEM"."FACTURA"
        WHERE EXTRACT(month FROM fecha) BETWEEN :1 AND :2 
        GROUP BY (sucursal,EXTRACT(month FROM fecha))`
      var binds2 = [parseInt(dateInit - (data.value - 1)), parseInt(dateInit)]
      oracle.execute(sql2, binds2, (err2, res2) => {
        console.log(res2);
        const totals = res2.rows
        var labelsAux = []
        var monthsAux = []
        var values = []

        //SUCURSALES
        totals.forEach(element => {
          labelsAux.push(element[0])
        })
        const distinct = (value, index, self) => {
          return self.indexOf(value) === index
        }
        const labels = labelsAux.filter(distinct)

        //FILTRAR POR MES
        totals.forEach(element => {
          monthsAux.push(element[2])
        })
        const months = monthsAux.filter(distinct)
        months.sort()
        console.log(months);
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        //VALORES
        for (let i = 0; i < months.length; i++) {
          var dataset = []
          const month = months[i];
          totals.forEach(element => {
            if (element[2] == month) {
              dataset.push([element[0], element[1]])
            }
          })
          values.push(dataset)
        }
        console.log(values);

        var datasets = []

        for (let i = 0; i < values.length; i++) {
          const element = values[i];
          var vals = []
          for (let j = 0; j < element.length; j++) {
            const elm = element[j];
            console.log("J");
            console.log(elm);
            vals.push(elm[1])
            console.log("i: " + i);

          }


          var color = '#' + Math.floor(Math.random() * 16777215).toString(16)
          var content = {
            "label": monthNames[months[i] - 1],
            "backgroundColor": color,
            "borderColor": "#000",
            "data": vals
          }
          datasets.push(content)
        }

        console.log(datasets)

        socket.emit('sel_data', {
          // The type of chart we want to create
          type: 'bar',
          // The data for our dataset
          data: {
            labels: ['MATRIZ','SUCURSAL 1'],
            datasets: [{"label": 'Mayo',
            "backgroundColor": ["#000"],
            "borderColor": ["#000"],
            "data": [10,25.3,45]}],
            // Configuration options go here
            options: {}
          }
        })
      })
    })
  })
})

//Run server
server.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
