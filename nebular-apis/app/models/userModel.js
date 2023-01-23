const sql = require('../db/config');
const bcrypt = require('bcryptjs');
var { v4: uuid } = require('uuid');
const config = require('../../utils/config');
const jwt = require('jsonwebtoken');
var { v4: uuid } = require('uuid');
const res = require('express/lib/response');
const moment = require("moment");
const { encryptData, decryptData } = require("../../utils/index")
const saltRounds = 10;

var User = function (list) {
    this.name = list.name;
    this.email = list.email;
}


User.addProveedors = function (userData, result) {
    var data = {}
    var insertedData = {
        codigo_proveedor: userData.codigo_proveedor ? userData.codigo_proveedor : null,
        codigo_padre: userData.codigo_padre ? userData.codigo_padre : null,
        razon_social: userData.razon_social ? userData.razon_social : null,
        ciudades: userData.ciudades ? userData.ciudades : null,
        pais: userData.pais ? userData.pais : null,
        direccion: userData.direccion ? userData.direccion : null,
        ciudad: userData.ciudad ? userData.ciudad : null,
        telefono: userData.telefono ? userData.telefono : null,
        cuenta: userData.cuenta ? userData.cuenta : null,
        fax: userData.fax ? userData.fax : null,
        contacts: userData.contacts ? userData.contacts : null
    }
    sql.query("INSERT INTO `proveedors` SET ? ", [insertedData], function (err, res) {
        if (err) {
            console.log(err)
            console.log(err)
            data['error'] = true;
            data['msg'] = err.code;
            data['body'] = [];
            result(null, data);
        } else {
            console.log(res)
            data['error'] = false;
            data['msg'] = "Success";
            data['body'] = res;
            result(null, data);
        }
    });


}
User.editProveedors = function (userData, result) {
    var data = {}
    console.log(userData)
    sql.query("SELECT * from proveedors WHERE id=?", [userData.id], (error, res) => {
        if (error) {
            data['error'] = true;
            data['msg'] = error.code;
            data['body'] = [error];
            result(null, data);
        } else {
            if (res.length > 0) {
                var updatedData = {
                    codigo_proveedor: userData.codigo_proveedor ? userData.codigo_proveedor : res[0].codigo_proveedor,
                    codigo_padre: userData.codigo_padre ? userData.codigo_padre : res[0].codigo_padre,
                    razon_social: userData.razon_social ? userData.razon_social : res[0].razon_social,
                    ciudades: userData.ciudades ? userData.ciudades : res[0].ciudades,
                    pais: userData.pais ? userData.pais : res[0].pais,
                    direccion: userData.direccion ? userData.direccion : res[0].direccion,
                    ciudad: userData.ciudad ? userData.ciudad : res[0].ciudad,
                    telefono: userData.telefono ? userData.telefono : res[0].telefono,
                    cuenta: userData.cuenta ? userData.cuenta : res[0].cuenta,
                    fax: userData.fax ? userData.fax : res[0].fax,
                    contacts: userData.contacts ? userData.contacts : res[0].contacts
                }
                sql.query("UPDATE proveedors SET ? WHERE id=?", [updatedData, userData.id], function (err, res1) {
                    console.log(sql)
                    if (err) {
                        console.log(err)
                        data['error'] = true;
                        data['msg'] = err.code;
                        data['body'] = [err];
                        result(null, data);
                    } else {

                        data['error'] = false;
                        data['msg'] = "Updated Successfully";
                        data['body'] = [];
                        result(null, data);
                    }
                });
            } else {
                data['error'] = true;
                data['msg'] = "No data founded";
                data['body'] = [];
                result(null, data);
            }

        }
    })

}
User.deleteProveedors = (userData, result) => {
    var data = {}
    sql.query("SELECT * from proveedors WHERE id=?", [userData.id], (error, res) => {
        if (error) {
            data['error'] = true;
            data['msg'] = error.code;
            data['body'] = [error];
            result(null, data);
        } else {
            sql.query("UPDATE proveedors SET is_deleted='1' WHERE id=?", [userData.id], function (err, res1) {
                //console.log(sql)
                if (err) {
                    console.log(err)
                    data['error'] = true;
                    data['msg'] = err.code;
                    data['body'] = [err];
                    result(null, data);
                } else {
                    data['error'] = false;
                    data['msg'] = "Deleted successfully";
                    data['body'] = [];
                    result(null, data);
                }
            })
        }
    })
}
User.getProveedors = (userData, result) => {
    var data = {}
    var searchStr = '';
    if (userData.searchStr) {
        const text = userData.searchStr.toLowerCase();
        var searchStr = "(( codigo_proveedor like '" + userData.searchStr + "%') or ( codigo_padre like '" + userData.searchStr + "%') or ( razon_social like '" + userData.searchStr + "%') or ( uu.ciudades like '" + userData.searchStr + "%') or ( uu.pais like '" + userData.searchStr + "%') or ( uu.direccion like '" + userData.searchStr + "%')or ( uu.ciudad like '" + userData.searchStr + "%') or ( uu.telefono like '" + userData.searchStr + "%') or ( uu.cuenta like '" + userData.searchStr + "%')) and";
        if (userData.searchStr == '') {
            var searchStr = '';
        }
    }
    var pageNo = userData.pageNo
    var limitNum = parseInt(userData.limitNum ? userData.limitNum : 10);
    var startNum = pageNo == 0 ? 0 : parseInt(pageNo) * limitNum;

    sql.query(`SELECT * FROM proveedors where  ${searchStr} is_deleted ='0'`, [limitNum, startNum], (error, res) => {
        if (error) {
            console.log(error)
            data['error'] = true;
            data['msg'] = error.code;
            data['body'] = [];
            result(null, data);
        } else {

            var page = {
                size: limitNum,
                totalElements: res.length,
                totalPages: Math.ceil(res.length == 0 ? 0 : res.length / limitNum),
                pageNumber: pageNo
            }
            data['error'] = false;
            data['msg'] = "Get successfully";
            data['pagination'] = page;
            data['body'] = res;
            result(null, data);
        }
    })
}
User.getProveedorsById = (userData, result) => {
    var data = {}
    sql.query("SELECT * FROM `proveedors` where id =? and is_deleted ='0'", [userData.id], (error, res) => {
        if (error) {
            console.log(error)
            data['error'] = true;
            data['msg'] = error.code;
            data['body'] = [];
            result(null, data);
        } else {
            data['error'] = false;
            data['msg'] = "Get successfully";
            data['body'] = res;
            result(null, data);
        }
    })
}
User.countryList = (params, result) => {
    let data = {}
    sql.query("SELECT * FROM country order by name ASC", (err, res) => {
        if (err) {
            console.log(err)
            data.error = true;
            data.msg = err.code;
            data.body = [err];
            result(null, data)
        }
        else {
            data.error = false;
            data.msg = 'success';
            data.body = res;
            result(null, data)
        }
    })
}

User.getStates = function (getData, result) {
    var data = {};
    sql.query('select* from states order by name ASC', function (error, res) {
        if (error) {
            console.log(error)
            data['error'] = true;
            data['msg'] = error.code;
            data['body'] = [];
            result(null, data);
        } else {
            data['error'] = false;
            data['msg'] = "successfully";
            data['body'] = res;
            result(null, data);
        }
    })
}
User.addPurchase = function (userData, result) {
    var data = {}
    var insertedData = {
        codigo_auxiliar: userData.codigo_auxiliar ? userData.codigo_auxiliar : null,
        numero_facture: userData.numero_facture ? userData.numero_facture : null,
        fecha_compra: userData.fecha_compra ? userData.fecha_compra : null,
        proveedor: userData.proveedor ? userData.proveedor : null,
        percentage_desc: userData.percentage_desc ? userData.percentage_desc : null,
        compania: userData.compania ? userData.compania : null,
        adquiridas_a_titulo: userData.adquiridas_a_titulo ? userData.adquiridas_a_titulo : null,
        CP: userData.CP ? userData.CP : null,
        fecha_CP: userData.fecha_CP ? userData.fecha_CP : null,
        tipo_de_compra: userData.tipo_de_compra ? userData.tipo_de_compra : null,
        resolucion: userData.resolucion ? userData.resolucion : null,
        fecha_pago: userData.fecha_pago ? userData.fecha_pago : null,
        ciudad_regalias: userData.ciudad_regalias ? userData.ciudad_regalias : null

    }
    sql.query("INSERT INTO `purchase` SET ? ", [insertedData], function (err, res) {
        if (err) {
            console.log(err)
            data['error'] = true;
            data['msg'] = err.code;
            data['body'] = [];
            result(null, data);
        } else {
            console.log(res)
            data['error'] = false;
            data['msg'] = "Success";
            data['body'] = res;
            result(null, data);
        }
    });


}
User.editPurchase = function (userData, result) {
    var data = {}
    sql.query("SELECT * from purchase WHERE id=?", [userData.id], (error, res) => {
        if (error) {
            data['error'] = true;
            data['msg'] = error.code;
            data['body'] = [error];
            result(null, data);
        } else {
            if (res.length > 0) {
                var updatedData = {
                    //codigo_proveedor: userData.codigo_proveedor ? userData.codigo_proveedor : res[0].codigo_proveedor,
                    codigo_auxiliar: userData.codigo_auxiliar ? userData.codigo_auxiliar : res[0].codigo_auxiliar,
                    numero_facture: userData.numero_facture ? userData.numero_facture : res[0].numero_facture,
                    fecha_compra: userData.fecha_compra ? userData.fecha_compra : res[0].fecha_compra,
                    proveedor: userData.proveedor ? userData.proveedor : res[0].proveedor,
                    percentage_desc: userData.percentage_desc ? userData.percentage_desc : res[0].percentage_desc,
                    compania: userData.compania ? userData.compania : res[0].compania,
                    adquiridas_a_titulo: userData.adquiridas_a_titulo ? userData.adquiridas_a_titulo : res[0].adquiridas_a_titulo,
                    CP: userData.CP ? userData.CP : res[0].CP,
                    fecha_CP: userData.fecha_CP ? userData.fecha_CP : res[0].fecha_CP,
                    tipo_de_compra: userData.tipo_de_compra ? userData.tipo_de_compra : res[0].tipo_de_compra,
                    resolucion: userData.resolucion ? userData.resolucion : res[0].resolucion,
                    fecha_pago: userData.fecha_pago ? userData.fecha_pago : res[0].fecha_pago,
                    ciudad_regalias: userData.ciudad_regalias ? userData.ciudad_regalias : res[0].ciudad_regalias
                }
                sql.query("UPDATE purchase SET ? WHERE id=?", [updatedData, userData.id], function (err, res1) {
                    console.log(sql)
                    if (err) {
                        console.log(err)
                        data['error'] = true;
                        data['msg'] = err.code;
                        data['body'] = [err];
                        result(null, data);
                    } else {

                        data['error'] = false;
                        data['msg'] = "Updated Successfully";
                        data['body'] = [];
                        result(null, data);
                    }
                });
            } else {
                data['error'] = true;
                data['msg'] = "No data founded";
                data['body'] = [];
                result(null, data);
            }

        }
    })

}
User.deletePurchase = (userData, result) => {
    var data = {}
    sql.query("SELECT * from purchase WHERE id=?", [userData.id], (error, res) => {
        if (error) {
            data['error'] = true;
            data['msg'] = error.code;
            data['body'] = [error];
            result(null, data);
        } else {
            sql.query("UPDATE purchase SET is_deleted='1' WHERE id=?", [userData.id], function (err, res1) {
                //console.log(sql)
                if (err) {
                    console.log(err)
                    data['error'] = true;
                    data['msg'] = err.code;
                    data['body'] = [err];
                    result(null, data);
                } else {
                    data['error'] = false;
                    data['msg'] = "Deleted successfully";
                    data['body'] = [];
                    result(null, data);
                }
            })
        }
    })
}
User.getPurchase = (userData, result) => {
    var data = {}
    var searchStr = '';
    if (userData.searchStr) {
        const text = userData.searchStr.toLowerCase();
        var searchStr = "(( codigo_auxiliar like '" + userData.searchStr + "%') or ( numero_facture like '" + userData.searchStr + "%') or ( fecha_compra like '" + userData.searchStr + "%') or ( uu.proveedor like '" + userData.searchStr + "%') or ( uu.percentage_desc like '" + userData.searchStr + "%')) and";
        if (userData.searchStr == '') {
            var searchStr = '';
        }
    }
    var pageNo = userData.pageNo
    var limitNum = parseInt(userData.limitNum ? userData.limitNum : 10);
    var startNum = pageNo == 0 ? 0 : parseInt(pageNo) * limitNum;

    sql.query(`SELECT * FROM purchase where  ${searchStr} is_deleted ='0'`, [limitNum, startNum], (error, res) => {
        if (error) {
            console.log(error)
            data['error'] = true;
            data['msg'] = error.code;
            data['body'] = [];
            result(null, data);
        } else {

            var page = {
                size: limitNum,
                totalElements: res.length,
                totalPages: Math.ceil(res.length == 0 ? 0 : res.length / limitNum),
                pageNumber: pageNo
            }
            data['error'] = false;
            data['msg'] = "Get successfully";
            data['pagination'] = page;
            data['body'] = res;
            result(null, data);
        }
    })
}
User.getPurchaseById = (userData, result) => {
    var data = {}
    sql.query("SELECT * FROM `purchase` where id =? and is_deleted ='0'", [userData.id], (error, res) => {
        if (error) {
            console.log(error)
            data['error'] = true;
            data['msg'] = error.code;
            data['body'] = [];
            result(null, data);
        } else {
            data['error'] = false;
            data['msg'] = "Get successfully";
            data['body'] = res;
            result(null, data);
        }
    })
}
module.exports = User;