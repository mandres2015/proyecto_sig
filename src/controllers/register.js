const ctrl = {};
var oracle = require('../bd/oracle-db');

ctrl.getRegister = async (req, res) => {
    if (req.session.admin == true) {
        oracle.connect().then(() => {
            oracle.execute(`SELECT NOMBRE FROM "SYSTEM"."SUCURSAL"`, [], (err, ans) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(ans.rows)
                    res.render('register', { sucursales: ans.rows })
                }
            })
        })
    }
    else {
        res.redirect('/')
    }
}

ctrl.postRegister = async (req, res) => {
    if (req.session.admin == true) {
        const data = req.body
        if (req.body.pass) {
            const passEnc = oracle.encrypt(req.body.pass);
            var sql
            var binds = [
                data.dni, data.name, data.lastName, data.address, data.phone,
                data.email, data.user, passEnc, data.typeUser, data.sucursal
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
                            res.send("El nombre de usuario ya esta en uso")
                            oracle.close()
                        }
                        else {
                            sql = `INSERT INTO "SYSTEM"."USUARIO" (CEDULA, NOMBRE, APELLIDO, DIRECCION, TELEFONO, CORREO, USUARIO, CLAVE, TIPO, SUCURSAL) VALUES (:1,:2,:3,:4,:5,:6,:7,:8,:9,:10)`
                            oracle.executeOptions(sql, binds, { autoCommit: true }, (err, resp) => {
                                if (err) {
                                    if (err.toString().indexOf("unique") != -1) {
                                        res.send("Ya existe un usuario registrado con esa cedula")
                                    }
                                    console.log(err)
                                }
                                else {
                                    console.log(resp);
                                    res.send('ok')
                                }
                                oracle.close()
                            })
                        }
                    }
                })
            })
        }
    } else {
        res.redirect('login')
    }
}

module.exports = ctrl