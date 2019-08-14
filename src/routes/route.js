const express = require('express');
var oracle = require("../bd/oracle-db")
const router = express.Router();


router.get('/', async (req, res) => {
    if (req.session.user) {
        res.render('venta', { user: req.session })
    }
    else {
        res.redirect('login')
    }
});

router.get('/estadisticas', (req, res) => {
    if (req.session.user) {
        res.render('stats', { user: req.session });
    } else {
        res.render('stats')
    }
});

/**
 * Mi parte, no borrar, hacer:
 * 1. commit
 * 2. push
 * 3. pull
 * En caso de error al hacer pull, ingresar:
 * pull --allow-unrelated-histories
 */

//controlador para cliente
const clientController = require('../controllers/cliente');
router.get('/clientes', clientController.listarClientes);
router.post('/add-cliente', clientController.insertarCliente);
router.get('/habilitar-cliente/:id', clientController.updateEstadoCliente);
router.get('/edit-cliente/:id', clientController.obtenerCliente); //obtener un cliente
router.post('/edit-cliente/:id', clientController.updateCliente); //actualizar el cliente

//controlador para productos
const productController = require('../controllers/producto');
router.get('/productos', productController.listarProductos);
router.post('/add-producto', productController.insertarProducto);
router.get('/habilitar-producto/:id', productController.updateEstadoProducto);
router.get('/edit-producto/:id', productController.obtenerProducto);
router.post('/edit-producto/:id', productController.updateProducto);


/*router.get('/clientes', (req, res) => {
    if (req.session.user) {
        res.render('clientes', { user: req.session });
    } else {
        res.redirect('login')
    }
});*/

router.get('/productos', (req, res) => {
    if (req.session.user) {
        res.render('productos', { user: req.session });
    } else {
        res.redirect('login')
    }
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
    if (req.session.user) {
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
    } else {
        res.redirect('login')
    }
})

// REGISTRO DE USUARIO
router.get('/register', async (req, res) => {
    req.session.admin = true
    if (req.session.admin == true) {
        res.render('register')
    }
    else {
        res.redirect('/')
    }
});
router.post('/register', async (req, res) => {
    req.session.admin = true
    if (req.session.admin == true) {
        const data = req.body

        if (req.body.pass) {
            const passEnc = oracle.encrypt(req.body.pass);
            var sql
            var binds = [
                data.dni, data.name, data.lastName, data.address, data.phone,
                data.email, data.user, passEnc, data.typeUser
            ]
            oracle.connect().then(() => {
                sql = `SELECT usuario FROM "SYSTEM"."USUARIO" WHERE usuario = :1`
                oracle.execute(sql, [data.user], (err2, resp2) => {
                    if (err2) {
                        oracle.close()
                        res.send("Ha ocurrido un error, vuelve a intentarlo")
                    }
                    else {
                        if (parseInt(resp2.rows.length) > 0) {
                            oracle.close()
                            res.send("El nombre de usuario ya esta en uso")
                        }
                        else {
                            sql = `INSERT INTO "SYSTEM"."USUARIO" (CEDULA, NOMBRE, APELLIDO, DIRECCION, TELEFONO, CORREO, USUARIO, CLAVE, TIPO) VALUES (:1,:2,:3,:4,:5,:6,:7,:8,:9)`
                            oracle.executeOptions(sql, binds, { autoCommit: true }, (err, resp) => {
                                if (err) {
                                    if (err.toString().indexOf("unique") == -1) {
                                        res.send("Ya existe un usuario registrado con esa cedula")
                                    }
                                    console.log(err.toString());
                                }
                                else {
                                    console.log(resp);
                                    console.log("Usuario registrado correctamente");
                                    res.render('venta');
                                }
                                //oracle.close()
                            })
                        }
                    }
                })
            })
            res.redirect('/');
        }
    } else {
        res.redirect('login')
    }
});

// LOGIN
router.get('/login', async (req, res) => {
    res.render('login')
});
router.post('/login', async (req, res) => {
    const data = req.body
    oracle.connect().then(() => {
        oracle.execute(`SELECT usuario FROM "SYSTEM"."USUARIO" WHERE usuario = :1`, [data.user], (err, resp) => {
            if (err) {
                console.log(err);
                res.send("Ha ocurrido un error, revise los datos en intente nuevamente")
            }
            else {
                if (resp.rows.length <= 0) {
                    res.send("El usuario ingresado no existe")
                }
                else {
                    oracle.execute(`SELECT tipo FROM "SYSTEM"."USUARIO" WHERE usuario = :1 AND clave = :2`, [data.user, oracle.encrypt(data.pass)], (err2, resp2) => {
                        if (err2) {
                            console.log(err2)
                            res.send("Ha ocurrido un error")
                        }
                        else {
                            req.session.user = data.user
                            console.log(resp2.rows[0][0]);
                            if (resp2.rows[0][0] === "admin") {
                                req.session.admin = true
                            }
                            else {
                                req.session.admin = false
                            }
                            //console.log(resp2)
                            res.send('200')
                        }
                    })
                }
            }
        })
    })
});

// Logout session
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('login')
});

module.exports = router;