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

module.exports = router;