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

module.exports = router;