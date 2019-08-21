const ctrl = {};
var oracle = require('../bd/oracle-db');

ctrl.getLogin = async (req, res) => {
    res.render('login')
}

ctrl.postLogin = async (req, res) => {
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
                    oracle.execute(`SELECT tipo,sucursal FROM "SYSTEM"."USUARIO" WHERE usuario = :1 AND clave = :2`, [data.user, oracle.encrypt(data.pass)], (err2, resp2) => {
                        if (err2) {
                            console.log(err2)
                            res.send("Ha ocurrido un error")
                        }
                        else {
                            if (resp2.rows.length > 0) {
                                req.session.user = data.user
                                req.session.sucursal = resp2.rows[0][1]
                                if (resp2.rows[0][0] === "admin") {
                                    req.session.admin = true
                                }
                                else {
                                    req.session.admin = false
                                }
                                res.send('ok')
                            }
                            else{
                                res.send("Datos incorrectos")
                            }
                        }
                        oracle.close()
                    })
                }
            }
        })
    })
}

ctrl.logout = async (req, res) => {
    req.session.destroy();
    res.redirect('login')
}

module.exports = ctrl