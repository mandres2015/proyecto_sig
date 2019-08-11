const ctrl = {};
var bd = require('../bd/oracle-db');
/**
 * El controlador de la tabla cliente.
 * Se puede hacer todo lo que se desea con el cliente en la BD
 */
ctrl.listarClientes = async (req, res) => {
    bd.connect().then((err) => {
        if (err) return res.status(200).send({ message: 'Ha ocurrido un error' });

        //Ejecutar la consulta
        bd.execute("SELECT * FROM CLIENTE", (err, clientes) => {
            if (!err) {
                res.render('clientes', { clientes });
            } else {
                console.log(err + '\nNo se ha entrado al listado de clientes');
                res.redirect('/');
            }
        });
    });
}
ctrl.insertarCliente = async (req, res) => {
    var params = req.body;
    var query = `INSERT INTO CLIENTE VALUES ('${params.cedulaCli}', '${params.nombresCli}', '${params.nombresCli}', '${params.telefonoCli}', '${params.direccionCli}', '${params.correoCli}', '${params.ciudadCli}')`
    console.log(query); //imprimiendo la consulta de inserción
    bd.connect().then((err) => {
        if (err) return res.status(200).send({ message: 'Ha ocurrido un error' });
        //Ejecutar la inserción en BD
        bd.execute(query, (err) => {
            if (!err) {
                console.log('Cliente ingresado con éxito');
                bd.commit();
                bd.execute("SELECT * FROM CLIENTE", (err, clientes) => {
                    if (!err) res.render('clientes', { clientes });
                });
            } else {
                console.log(err + '\nNo se ha podido ingresar el registro');
                bd.close();
                res.redirect('/');
            }
        });
    });
}
ctrl.eliminarCliente = async (req, res)=>{
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
}


module.exports = ctrl;