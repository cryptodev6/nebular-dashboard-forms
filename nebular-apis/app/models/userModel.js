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
    console.log(userData)
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
                console.log(sql)
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
    if (userData.searchStr) {
        const text = userData.searchStr.toLowerCase();
        var searchStr = "((  uu.codigo_proveedor like '" + userData.searchStr + "%') or ( uu.codigo_padre like '" + userData.searchStr + "%') or ( uu.razon_social like '" + userData.searchStr + "%') or ( uu.ciudades like '" + userData.searchStr + "%')) or ( uu.pais like '" + userData.searchStr + "%')) or ( uu.direccion like '" + userData.searchStr + "%')) or ( uu.ciudad like '" + userData.searchStr + "%')) or ( uu.telefono like '" + userData.searchStr + "%'))  or ( uu.cuenta like '" + userData.searchStr + "%')) and";
        if (userData.searchStr == '') {
            var searchStr = '';
        }
    }
    var pageNo = userData.pageNo
    var limitNum = parseInt(userData.limitNum ? userData.limitNum : 10);
    var startNum = pageNo == 0 ? 0 : parseInt(pageNo) * limitNum;

    sql.query(`SELECT * FROM proveedors as uu where  ${searchStr} is_deleted ='0'`, [limitNum, startNum], (error, res) => {
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
    sql.query("SELECT * FROM `proveedors` where id =?", [userData.id], (error, res) => {
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