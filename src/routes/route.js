const express = require('express');
var oracle = require("../bd/oracle-db")
const router = express.Router();

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

const saleController = require('../controllers/sale');
router.get('/searchclient', saleController.searchClient)
router.get('/searchproduct', saleController.searchProduct)
router.post('/saveSale', saleController.saveSale)

router.get('/', (req, res) => {
    if (req.session.user) {
        res.render('venta', { user: req.session })
    }
    else {
        res.redirect('login')
    }
});

router.get('/estadisticas', (req, res) => {
    req.session.admin = true
    if (req.session.admin == true) {
        res.render('stats', { user: req.session });
    } else {
        res.render('login')
    }
});

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


// REGISTRO DE USUARIO
const registerController = require('../controllers/register')
router.get('/register', registerController.getRegister)
router.post('/register', registerController.postRegister)


// LOGIN
const loginController = require('../controllers/login')
router.get('/login', loginController.getLogin)
router.post('/login', loginController.postLogin)
router.get('/logout', loginController.logout)

module.exports = router;