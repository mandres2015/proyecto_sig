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
              backgroundColor: [hexToRgbA(), hexToRgbA(), hexToRgbA(), hexToRgbA(), hexToRgbA()],
              borderColor: '#fff',
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
      var dateInit = new Date().getMonth() + 1
      if (data.vale == 12)
        dateInit = 12
      console.log(dateInit);
      console.log(parseInt(dateInit - (data.value - 1)));
      const sql2 = `SELECT sucursal, SUM(total)as total,EXTRACT(month FROM fecha) as mes FROM "SYSTEM"."FACTURA"
        WHERE EXTRACT(month FROM fecha) BETWEEN :1 AND :2 
        GROUP BY (sucursal,EXTRACT(month FROM fecha))`

      var binds2 = [parseInt(dateInit - (data.value - 1)), parseInt(dateInit)]
      oracle.execute(sql2, binds2, (err2, res2) => {
        const totals = res2.rows
        var sucursalesNames = []
        var monthsIndex = []

        console.log(totals);

        totals.forEach(row => {
          if (monthsIndex.length == 0) {
            monthsIndex.push(row[2])
          }
          else {
            let rep = false
            for (let i = 0; i < monthsIndex.length; i++) {
              const element = monthsIndex[i];
              if (element === row[2]) {
                rep = true
                break;
              }
            }
            if (!rep) {
              monthsIndex.push(row[2])
            }
          }
        });

        monthsIndex.sort()
        // monthsIndex ARREGLO CON LOS INDICES DE LOS MESES SELECCIONADOS

        totals.forEach(row => {
          if (sucursalesNames.length == 0) {
            sucursalesNames.push(row[0])
          }
          else {
            let rep = false
            for (let i = 0; i < sucursalesNames.length; i++) {
              const element = sucursalesNames[i];
              if (element === row[0]) {
                rep = true
                break;
              }
            }
            if (!rep) {
              sucursalesNames.push(row[0])
            }
          }
        });

        sucursalesNames.sort()

        var sumas = []

        sucursalesNames.forEach(sucursal => {
          var suma = 0
          for (let i = 0; i < totals.length; i++) {
            const element = totals[i];
            if (element[0] === sucursal) {
              suma += element[1]
            }
          }
          sumas.push(suma)
        });

        var falta = totals

        sucursalesNames.forEach(sucursal => {
          monthsIndex.forEach(month => {
            var exist = false
            falta.forEach(row => {
              if (row[0] == sucursal) {
                if (row[2] == month) {
                  exist = true
                }
              }
            });
            if (!exist) {
              totals.push([sucursal, 0, month])
            }
          });
        });

        console.log("FINAL");

        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        var datasets = []

        monthsIndex.forEach(month => {
          var dataset = []
          totals.forEach(row => {
            if (dataset.length == 0) {
              dataset.push(month)
            }
            if (row[2] === month) {
              dataset.push([row[1], row[0]])
            }
          });
          datasets.push(dataset)
        });

        var dataFinal = []
        console.log(datasets.sort());

        for (let i = 0; i < datasets.length; i++) {
          const datos = datasets[i];
          const numberMonth = datasets[i][0] - 1
          let dataS = datos.splice(1)
          let objetos = []
          console.log(dataS);
          sucursalesNames.forEach(sucursal => {
            for (let i = 0; i < dataS.length; i++) {
              const element = dataS[i];
              if (element[1] === sucursal) {
                objetos.push(element[0])
              }
            }
          });
          var obj = {
            label: monthNames[numberMonth],
            backgroundColor: hexToRgbA(),
            data: objetos
          }
          dataFinal.push(obj)
        }

        var ki = 0
        sucursalesNames.forEach(sucursal => {
          sucursal = sucursal + " ($" + Math.round(sumas[ki] * 100) /100 + ")"
          sucursalesNames[ki] = sucursal
          ki++
        });

        socket.emit('sel_data', {
          // The type of chart we want to create
          type: 'bar',
          // The data for our dataset
          data: {
            labels: sucursalesNames,
            datasets: dataFinal,
          },
          // Configuration options go here
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        })
      })
    })
  })
  socket.on('payment', (data) => {
    oracle.connect().then(() => {
      const sql = `SELECT forma_de_pago,COUNT(forma_de_pago) FROM FACTURA WHERE sucursal = :1 GROUP BY forma_de_pago`
      var binds = [data.sucursal]
      oracle.execute(sql, binds, (err1, res1) => {
        console.log(res1.rows);
        const methods = res1.rows
        var labels = ['EFECTIVO', 'TARJETA DE CREDITO']
        var values = [0, 0]
        console.log(methods[0][0]);


        for (let i = 0; i < methods.length; i++) {
          const element = methods[i];
          values[element[0] - 1] = element[1]
        }
        var vals = []
        for (let i = 0; i < values.length; i++) {
          vals.push(Math.round(values[i] / (values[0] + values[1]) * 100))
        }
        console.log(vals);

        socket.emit('payment_data', {
          // The type of chart we want to create
          type: 'pie',
          // The data for our dataset
          data: {
            labels: labels,
            datasets: [{
              label: '',
              backgroundColor: [hexToRgbA(), hexToRgbA(), hexToRgbA(), hexToRgbA(), hexToRgbA()],
              borderColor: '#fff',
              data: vals
            }]
          },
          // Configuration options go here
          options: {}
        })
      })
    })
  })
})

function hexToRgbA() {
  var c, hex = '#' + Math.floor(Math.random() * 16777215).toString(16);
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.8)';
  }
  return 'rgba(255, 35, 68, .5)'
}

//Run server
server.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
