const ctrl = {};
var bd = require('../bd/oracle-db');
/**
 * El controlador de la tabla cliente.
 * Se puede hacer todo lo que se desea con el cliente en la BD
 */

ctrl.listarclientes = async (req, res) => {
    bd.connect().then((err) => {
        if (err) return res.status(200).send({ message: 'Ha ocurrido un error' });

        //Ejecutar la consulta
        bd.execute("SELECT * FROM CLIENTE", (err, clientes) => {
            if (!err) {
                /*for(var i = 0; i < clientes.rows.length; i++){
                    for(var j = 0; j < clientes.rows[i].length; j++){                        
                    console.log(clientes.rows[i][j]);
                    }
                }*/
                res.render('clientes', {clientes});
            } else {
                console.log(err + '\nNo se ha entrado al listado de clientes');
                res.redirect('/');
            }
        });
    });
};

module.exports = ctrl;