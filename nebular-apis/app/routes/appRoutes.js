const express = require('express');
var helper = require("../../utils/helper");
const router = express.Router();
const userController = require('../controller/userController');

/////////Proveedors/////////////
router.post('/addProveedors', userController.addProveedors);
router.post('/editProveedors', userController.editProveedors);
router.post('/deleteProveedors', userController.deleteProveedors);
router.get('/getProveedors', userController.getProveedors);
router.get('/getProveedorsById', userController.getProveedorsById);
////////country & states //////////////
router.get('/countryList', userController.countryList);
router.get('/getStates', userController.getStates);
///////////////purchase///////////////
router.post('/addPurchase', userController.addPurchase);
router.post('/editPurchase', userController.editPurchase);
router.post('/deletePurchase', userController.deletePurchase);
router.get('/getPurchase', userController.getPurchase);
router.get('/getPurchaseById', userController.getPurchaseById);
///////////////Ventas///////////////
router.post('/addVentas', userController.addVentas);
router.get('/addVentas', function() {
	console.log("arrived to add ventas");
});
router.post('/editVentas', userController.editVentas);
router.get('/getVentas', userController.getVentas);
router.post('/deleteVentas', userController.deleteVentas);
router.get('/getVentasById', userController.getVentasById);

/////////clientes/////////////
router.post('/addClientes', userController.addClientes);
router.post('/editClientes', userController.editClientes);
router.post('/deleteClientes', userController.deleteClientes);
router.get('/getClientes', userController.getClientes);
router.get('/getClientesById', userController.getClientesById);
module.exports = router;