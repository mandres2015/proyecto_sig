const ctrl = {};
var oracle = require('../bd/oracle-db');
/**
 * El controlador de la tabla producto.
 * Se puede hacer todo lo que se desea con el cliente en la BD
 * TABLA PRODUCTO propiedad ESTADO:
 * 1: habilitado
 * 0: deshabilitado
 * select column_name from all_tab_columns where table_name = 'nombre_tabla_buscada' para obtner las columnas de una tabla
 */

ctrl.listarProductos = async (req, res) => {
    oracle.connect().then((err) => {
        if (err) return res.status(200).send({ message: 'Ha ocurrido un error' });

        //Ejecutar la consulta
        oracle.execute("SELECT * FROM PRODUCTO", [], (err, productos) => {
            if (!err) {
                res.render('productos', { productos, user: req.session });
            } else {
                console.log(err + '\nNo se ha entrado al listado de productos');
                res.redirect('/');
            }
        });
    });
}
ctrl.insertarProducto = async (req, res) => {
    var params = req.body;
    console.log(params);
    const opts = [params.codeProd, params.nameProd, params.descriptionProd, parseFloat(params.precioProd), parseFloat(params.cantProd), params.estadoProd, params.ciudadProd, params.categoriaProd, parseInt(params.umedida), params.proveedorProd ]
    console.log(opts);
    var sql = `INSERT INTO PRODUCTO(ID, NOMBRE, DESCRIPCION, PRECIO, CANTIDAD_STOCK, ESTADO, SUCURSAL, CATEGORIA, U_MEDIDA, PROVEEDOR) VALUES (:a, :b, :c, :d, :e, :f, :g, :h, :i, :j)`
    
    //oracle.executeOptions(`INSERT INTO "SYSTEM"."FACTURA" (ID, CLIENTE, IVA, DESCUENTO, SUBTOTAL, TOTAL, ESTADO, FORMA_DE_PAGO, FECHA) VALUES (:a,:b,:c,:d,:e,:f,:g,:h,:i)`, opts, { autoCommit: true }, (ex, bill) => {
    //console.log(sql); //imprimiendo la consulta de inserción
    oracle.connect().then((err) => {
        if (err) return res.status(200).send({ message: 'Ha ocurrido un error' });
        //Ejecutar la inserción en BD
        oracle.executeOptions(sql, opts, { autoCommit: true }, (err, result) => {
            if (!err) {
                console.log('Producto ingresado con éxito');
                //oracle.commit();
                oracle.execute("SELECT * FROM PRODUCTO", [], (err, productos) => {
                    if (!err) res.render('productos', { productos, user: req.session });
                });
            } else {
                console.log(result);
                console.log(err + '\nNo se ha podido ingresar el registro');
                oracle.close();
                res.redirect('/');
            }
        });
    });
}
ctrl.obtenerProducto = async (req, res) => {
    const { id } = req.params;
    console.log('id recibido para actualizar: ' + id);
    const sql = `SELECT * FROM PRODUCTO WHERE ID = :a`
    oracle.connect().then((err) => {
        if (err) return res.status(200).send({ message: 'Ha ocurrido un error' });
        oracle.execute(sql, [id], (err, producto) => {
            if (!err) {
                console.log(producto.rows); // se obtiene el producto
                // renderizar la pagina de actualizar enviando los datos del producto
                res.render('edit_producto', { producto });
            }
        });
    });
}
ctrl.updateProducto = async (req, res) => {
    console.log(req.body);
    console.log(req.params);
    var params = req.body;
    const opts = [params.nameProd, params.descriptionProd, params.precioProd, params.cantProd, params.estadoProd, params.ciudadProd, params.categoriaProd, params.umedida, params.proveedorProd, req.params.id ]
    var sql = `UPDATE CLIENTE SET NOMBRE = :a, DESCRIPCION = :b, PRECIO = :c, CANTIDAD_STOCK = :d, ESTADO = :e, SUCURSAL = :f, CATEGORIA = :g, U_MEDIDA = :h, PROVEEDOR = :i
    WHERE ID=:j`
    console.log(sql, opts);
    oracle.connect().then((err) => {
        if (err) return res.status(200).send({ message: 'Ha ocurrido un error' });
        //Ejecutar la actualización en BD
        oracle.executeOptions(sql, opts, { autoCommit: true }, (err, result) => {
            if (!err) {
                console.log('Producto actualizado con éxito');
                console.log(result);
                oracle.execute("SELECT * FROM PRODUCTO", [], (err, productos) => {
                    if (!err) res.render('productos', { productos, user: req.session });
                });
            } else {
                console.log(err + '\nNo se ha podido actualizar el registro');
                oracle.close();
                res.redirect('/');
            }
        });
    });
}
ctrl.updateEstadoProducto = async (req, res) => {
    const { id } = req.params;
    var opts = [id];
    console.log('id recibido para actualizar: ' + id);
    const sql = `UPDATE PRODUCTO SET ESTADO = :a WHERE ID = :b`;
    oracle.connect().then((err) => {
        if (err) return res.status(200).send({ message: 'Ha ocurrido un error' });
        oracle.execute(`SELECT ESTADO FROM PRODUCTO WHERE ID = :a`, opts, (err, estado) => {
            if (!err) {
                console.log("estado:--> " + estado.rows[0][0]); //obtienen el estado desde la BD
                estado = cambiarEstado(estado);
                //Actualizar la BD
                opts = [estado, id];
                oracle.executeOptions(sql, opts, { autoCommit: true }, (err, result) => {
                    if (!err) {
                        console.log('Estado actualizado');
                        res.redirect('/productos');
                        /*oracle.execute("SELECT * FROM CLIENTE", [], (err, clientes) => {
                            if (!err) res.render('clientes', { clientes, user: req.session });
                        });*/
                    } else {
                        console.log(result);
                        console.log(err + '\nNo se ha podido actualizar el registro');
                        oracle.close();
                        res.redirect('/');
                    }
                });
            }
        });
    });
}

function cambiarEstado(estado) {
    estado.rows[0][0] === '1' ? estado = '0' : estado = '1';
    return estado;
}



module.exports = ctrl;