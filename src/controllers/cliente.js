const ctrl = {};
var oracle = require('../bd/oracle-db');
/**
 * El controlador de la tabla cliente.
 * Se puede hacer todo lo que se desea con el cliente en la BD
 */
function obtenerCategorias(req, res){
    oracle.connect().then((err)=>{
        if(err) return res.status(200).send({message: 'Ha ocurrido un error'});

        //Ejecutar la consulta
        oracle.execute("SELECT * FROM CATEGORIA", [], (err, categorias)=>{
            if(!err){
                return categorias;
            }else{
                console.log(err+'\nNo se pudo obtener el listado de categorias');
                return res.status(404).send({message: 'No se obtuvieron categorias'});
            }
        });
    });
}

ctrl.listarClientes = async (req, res) => {
    oracle.connect().then((err) => {
        if (err) return res.status(200).send({ message: 'Ha ocurrido un error' });
        categorias = obtenerCategorias(req, res); //Se obtienen las categorías
        //Ejecutar la consulta
        oracle.execute("SELECT * FROM CLIENTE", [], (err, clientes) => {
            if (!err) {
                res.render('clientes', { clientes, categorias, user: req.session });
            } else {
                console.log(err + '\nNo se ha entrado al listado de clientes');
                res.redirect('/');
            }
        });
    });
}
ctrl.insertarCliente = async (req, res) => {
    var params = req.body;
    const opts = [params.cedulaCli, params.nombresCli, params.nombresCli, params.telefonoCli, params.direccionCli, params.correoCli, params.ciudadCli, '1']
    var sql = `INSERT INTO CLIENTE(IDENTIFICACION, NOMBRES, APELLIDOS, TELEFONO, DIRECCION, CORREO, CIUDAD, ESTADO) VALUES (:a, :b, :c, :d, :e, :f, :g, :h)`
    oracle.connect().then((err) => {
        if (err) return res.status(200).send({ message: 'Ha ocurrido un error' });
        //Ejecutar la inserción en BD
        oracle.executeOptions(sql, opts, { autoCommit: true }, (err, result) => {
            if (!err) {
                console.log('Cliente ingresado con éxito');
                //oracle.commit();
                oracle.execute("SELECT * FROM CLIENTE", [], (err, clientes) => {
                    if (!err) res.render('clientes', { clientes, user: req.session });
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
ctrl.obtenerCliente = async (req, res) => {
    const { id } = req.params;
    //console.log('id recibido para actualizar: ' + id);
    const sql = `SELECT * FROM CLIENTE WHERE IDENTIFICACION = :a`
    oracle.connect().then((err) => {
        if (err) return res.status(200).send({ message: 'Ha ocurrido un error' });
        oracle.execute(sql, [id], (err, cliente) => {
            if (!err) {
                //console.log(cliente.rows); // se obtiene el cliente
                // renderizar la pagina de actualizar enviando los datos del cliente
                res.render('edit_cliente', { cliente });
            }
        })
    })
}
ctrl.updateCliente = async (req, res) => {
    //console.log(req.body);
    //console.log(req.params);
    var params = req.body;
    const opts = [params.nombresCli, params.nombresCli, params.telefonoCli, params.direccionCli, params.correoCli, params.ciudadCli, '1', req.params.id]
    var sql = `UPDATE CLIENTE SET NOMBRES = :a, APELLIDOS = :b, TELEFONO = :c, DIRECCION = :d, CORREO = :e, CIUDAD = :f, ESTADO = :g WHERE IDENTIFICACION=:h`
    console.log(sql, opts);
    oracle.connect().then((err) => {
        if (err) return res.status(200).send({ message: 'Ha ocurrido un error' });
        //Ejecutar la actualización en BD
        oracle.executeOptions(sql, opts, { autoCommit: true }, (err, result) => {
            if (!err) {
                console.log('Cliente actualizado con éxito');
                console.log(result);
                oracle.execute("SELECT * FROM CLIENTE", [], (err, clientes) => {
                    if (!err) res.render('clientes', { clientes, user: req.session });
                });
            } else {
                console.log(err + '\nNo se ha podido actualizar el registro');
                oracle.close();
                res.redirect('/');
            }
        });
    });
}
ctrl.updateEstadoCliente = async (req, res) => {
    const { id } = req.params;
    var opts = [id];
    console.log('id recibido para actualizar: ' + id);
    const sql = `UPDATE CLIENTE SET ESTADO = :a WHERE IDENTIFICACION = :b`;
    oracle.connect().then((err) => {
        if (err) return res.status(200).send({ message: 'Ha ocurrido un error' });
        oracle.execute(`SELECT ESTADO FROM CLIENTE WHERE IDENTIFICACION = :a`, opts, (err, estado) => {
            if (!err) {
                console.log("estado:--> " + estado.rows[0][0]); //obtienen el estado desde la BD
                estado = cambiarEstado(estado);
                //Actualizar la BD
                opts = [estado, id];
                oracle.executeOptions(sql, opts, { autoCommit: true }, (err, result) => {
                    if (!err) {
                        console.log('Estado actualizado');
                        res.redirect('/clientes');
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

/*ctrl.eliminarCliente = async (req, res)=>{
    var id = req.body.cedulaCli;
    
    bd.connect().then((err)=>{
        if(err) return res.status(200).send({message: 'Ha ocurrido un error'});
        bd.execute(`DELETE FROM CLIENTE WHERE identificacion='${id}'`, (err, result)=>{
            if(!err){
                console.log('Cliente eliminado', {result});
                bd.commit();
                res.redirect('/');
            }else{
                console.log(err+ '\nNo se pudo eliminar');
                bd.close();
                res.redirect('/');
            }
        });
    });
}*/


module.exports = ctrl;