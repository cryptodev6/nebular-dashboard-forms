const User = require('../models/userModel');
const { encryptData, decryptData } = require("../../utils/validation");


exports.addProveedors = function (req, res) {
    var param = req.body
    // console.log("params***********", params)
    if (req.param && !!param.codigo_proveedor) {
        User.addProveedors(param, function (err, response) {
            if (err)
                response.send(err);
            res.json(response);
        });
    } else {
        data['error'] = true;
        data['msg'] = 'All field required';
        data['body'] = [];
        res.json(data);
    }

}
exports.editProveedors = function (req, res) {
    var param = req.body
    // console.log("params***********", params)
    User.editProveedors(param, function (err, response) {
        if (err)
            res.send(err);
        res.json(response);
    });

}
exports.deleteProveedors = function (req, res) {
    var param = req.body
    User.deleteProveedors(param, function (err, response) {
        if (err)
            res.send(err);
        res.json(response);
    });

}
exports.getProveedors = function (req, res) {
    var params = { ...req.query, ...req.params };
    // console.log("params***********", params)
    User.getProveedors(params, function (err, response) {
        if (err)
            res.send(err);
        res.json(response);
    });

};
exports.getProveedorsById = function (req, res) {
    var params = { ...req.query, ...req.params };
    // console.log("params***********", params)
    User.getProveedorsById(params, function (err, response) {
        if (err)
            res.send(err);
        res.json(response);
    });

};
exports.countryList = (req, res) => {
    User.countryList({}, (err, response) => {
        if (err)
            res.send(err)
        res.json(response)
    })
}
exports.getStates = (req, res) => {
    User.getStates({}, (err, response) => {
        if (err)
            res.send(err)
        res.json(response)
    })
}
exports.addPurchase = function (req, res) {
    var param = req.body
    // console.log("params***********", params)
    if (req.param && !!param.codigo_proveedor) {
        User.addPurchase(param, function (err, response) {
            if (err)
                response.send(err);
            res.json(response);
        });
    } else {
        data['error'] = true;
        data['msg'] = 'All field required';
        data['body'] = [];
        res.json(data);
    }

}
exports.editPurchase = function (req, res) {
    var param = req.body
    // console.log("params***********", params)
    User.editPurchase(param, function (err, response) {
        if (err)
            res.send(err);
        res.json(response);
    });

}
exports.deletePurchase = function (req, res) {
    var param = req.body
    User.deletePurchase(param, function (err, response) {
        if (err)
            res.send(err);
        res.json(response);
    });

}
exports.getPurchase = function (req, res) {
    var params = { ...req.query, ...req.params };
    // console.log("params***********", params)
    User.getPurchase(params, function (err, response) {
        if (err)
            res.send(err);
        res.json(response);
    });

};
exports.getPurchaseById = function (req, res) {
    var params = { ...req.query, ...req.params };
    // console.log("params***********", params)
    User.getPurchaseById(params, function (err, response) {
        if (err)
            res.send(err);
        res.json(response);
    });

};