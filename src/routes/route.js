const express = require('express');
var oracle = require("../bd/oracle-db")
const router = express.Router();
const ClienteController = require('../controllers/cliente');

router.get('/', async (req, res) => {

    res.render('venta')
});

router.get('/clientes', ClienteController.listarclientes);
/*router.get('/clientes', async (req, res) => {
    oracle.connect().then((err) => {
        if (err) return res.status(200).send({ message: 'Ha ocurrido un error' });

        //Ejecutar la consulta
        oracle.execute("SELECT * FROM CLIENTE", (err, clientes) => {
            if (!err) {
                console.log(clientes.rows);
                res.render('clientes', {clientes});
            } else {
                console.log(err + '\nNo se ha entrado al listado de clientes');
                res.redirect('/');
            }
        });
    });
});*/

router.get('/productos', (req, res) => {
    res.render('productos');
});

router.post('/add', async (req, res, next) => {
    pg.crud("INSERT INTO task (description) VALUES ($1)", [req.body.description], (err) => {
        if (!err)
            res.redirect('/');
    })
});

router.get('/searchclient', async (req, res) => {
    console.log(req.query.clientSearch);

    // Metodo para sentencias oracle
    oracle.connect().then(() => {
        oracle.execute("SELECT identificacion,nombres,apellidos,direccion,telefono FROM CLIENTE WHERE identificacion LIKE :id OR nombres LIKE :id OR apellidos LIKE :id", [("%" + req.query.clientSearch + "%").toUpperCase()], (err, clients) => {
            if (!err) {
                console.log(clients.rows);
                oracle.close()
                res.send(clients.rows)
            }
            else {
                console.log(err);
                oracle.close()
            }
        })
    })
})

router.get('/searchproduct', async (req, res) => {
    console.log(req.query.productSearch);

    // Metodo para sentencias oracle
    oracle.connect().then(() => {
        oracle.execute("SELECT id,nombre,cantidad_stock,precio FROM PRODUCTO WHERE id LIKE :id OR nombre LIKE :id", [("%" + req.query.productSearch + "%").toUpperCase()], (err, products) => {
            if (!err) {
                console.log(products.rows);
                oracle.close()
                res.send(products.rows)
            }
            else {
                console.log(err);
                oracle.close()
            }
        })
    })
})

router.post('/saveSale', async (req, res) => {
    try {
        const dataSale = req.body

        // Metodo para sentencias oracle
        oracle.connect().then(() => {
            try {
                // Buscar el numero de factura (POR SI ACASO ALGUIEN YA INSERTO OTRA ANTERIORMENTE)
                oracle.execute(`SELECT id FROM "SYSTEM"."FACTURA" WHERE ROWNUM = '1' ORDER BY id DESC`, [], (error, lastRowBill) => {
                    var lastBill
                    if (!error) {
                        if (lastRowBill.rows != "") {
                            lastBill = parseInt(lastRowBill.rows[0][0])
                        }
                        else {
                            lastBill = 0
                        }
                        // BUSCAR EL ULTIMO DETALLE
                        oracle.execute(`SELECT id FROM "SYSTEM"."DETALLE" WHERE ROWNUM = '1' ORDER BY id DESC`, [], (erro, lastRowDetail) => {
                            var lastDetail
                            if (lastRowBill.rows != "") {
                                lastDetail = parseInt(lastRowDetail.rows[0][0])
                            }
                            else {
                                lastDetail = 0
                            }
                            if (!erro) {
                                const opts = [lastBill + 1, req.body.client, parseFloat(req.body.iva), '0', parseFloat(req.body.subtotal), parseFloat(req.body.total), '1', req.body.metodo, new Date()]
                                oracle.executeOptions(`INSERT INTO "SYSTEM"."FACTURA" (ID, CLIENTE, IVA, DESCUENTO, SUBTOTAL, TOTAL, ESTADO, FORMA_DE_PAGO, FECHA) VALUES (:a,:b,:c,:d,:e,:f,:g,:h,:i)`, opts, { autoCommit: true }, (ex, bill) => {
                                    const sql = 'INSERT INTO "SYSTEM"."DETALLE" (ID, CANTIDAD, PRECIO, PRODUCTO, FACTURA) VALUES (:a,:b,:c,:d,:e)'
                                    var binds = []
                                    var options = {
                                        autoCommit: true,
                                        batchErrors: true
                                    };

                                    for (let i = 0; i < dataSale.products.length; i++) {
                                        let items = []
                                        const product = dataSale.products[i]
                                        items.push(lastDetail + i + 1)
                                        items.push(product[2])
                                        items.push(parseFloat(product[1]))
                                        items.push(product[0])
                                        items.push(lastBill + 1)
                                        binds.push(items)
                                    }

                                    // INSERTAR TODOS LOS DETALLES DE LA FACTURA
                                    oracle.executeMany(sql, binds, options, function (err, result) {
                                        if (!err) {

                                            const sql = `UPDATE "SYSTEM"."PRODUCTO" SET cantidad_stock = :a WHERE id = :b`
                                            var binds = []
                                            var options = {
                                                autoCommit: true,
                                                batchErrors: true
                                            };

                                            for (let i = 0; i < dataSale.products.length; i++) {
                                                let items = []
                                                const product = dataSale.products[i]
                                                items.push(parseFloat(product[3]) - parseFloat(product[2]))
                                                console.log("cantidad" + (parseFloat(product[3]) - parseFloat(product[2])));

                                                items.push(product[0])
                                                binds.push(items)
                                            }

                                            oracle.executeMany(sql, binds, options, function (errorx, result) {
                                                if (errorx) {
                                                    console.error(errorx);
                                                    oracle.close()
                                                    res.status(500).send()
                                                }
                                                else {
                                                    console.log("Result is:", result);
                                                    oracle.close()
                                                    res.send({ msg: "VENTA REALIZADA CORRECTAMENTE" })
                                                }
                                            })
                                        }
                                    });
                                })
                            }
                        })
                    }
                })
            } catch (e) {
                console.log(e);
            }
        })
    }
    catch (e) {
        console.log(e);
    }
})



module.exports = router;