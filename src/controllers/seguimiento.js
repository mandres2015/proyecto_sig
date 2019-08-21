const cntrl = {}
var oracle = require('../bd/oracle-db');

cntrl.getSeguimiento = async (req, res) => {
    if (req.session.admin == true) {
        res.render('seguimiento', { user: req.session });
    } else {
        res.render('login')
    }
}

module.exports = cntrl