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
        contacts: userData.contacts ? userData.contacts : null,
        hasta: userData.hasta ? userData.hasta : null,
        desde: userData.desde ? userData.desde : null,
        prefijo: userData.prefijo ? userData.prefijo : null,
        resolucion: userData.resolucion ? userData.resolucion : null,
        // vencimiento: userData.vencimiento ? userData.vencimiento : null,

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
                    contacts: userData.contacts ? userData.contacts : res[0].contacts,
                    hasta: userData.hasta ? userData.hasta : null,
                    desde: userData.desde ? userData.desde : null,
                    prefijo: userData.prefijo ? userData.prefijo : null,
                    resolucion: userData.resolucion ? userData.resolucion : null,
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
        // CP: userData.CP ? userData.CP : null,
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
    console.log("EDIT PURCHASE", userData)
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
            console.log("RESSS", result);
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
User.addVentas = function (userData, result) {

    console.log("userDatasssssssssssssssssssssssssssssss")
    console.log(userData)
    var data = {}
    var insertedData = {
        codigoAuncliar: userData.codigoAuncliar ? userData.codigoAuncliar : null,
        fechaAuncliar: userData.fechaAuncliar ? userData.fechaAuncliar : null,
        numerodeDEX: userData.numerodeDEX ? userData.numerodeDEX : null,
        faprobacion: userData.faprobacion ? userData.faprobacion : null,
        fec_embarque: userData.fec_embarque ? userData.fec_embarque : null,
        fecha_deuda_externa_plan: userData.fecha_deuda_externa_plan ? userData.fecha_deuda_externa_plan : null,
        fecha_deuda_externa: userData.fecha_deuda_externa ? userData.fecha_deuda_externa : null,
        plan: userData.plan ? userData.plan : null,
        compania_exportadora: userData.compania_exportadora ? userData.compania_exportadora : null,
        comprador: userData.comprador ? userData.comprador : null,
        pais: userData.pais ? userData.pais : null,
        aduana: userData.aduana ? userData.aduana : null,
        velor_fletes: userData.velor_fletes ? userData.velor_fletes : null,
        velor_seguro: userData.velor_seguro ? userData.velor_seguro : null,
        velor_otros_gastos: userData.velor_otros_gastos ? userData.velor_otros_gastos : null,
        documento: userData.documento ? userData.documento : null,
        compania_sel: userData.compania_sel ? userData.compania_sel : null,
        compania_do: userData.compania_do ? userData.compania_do : null,
        ventas: userData.ventas ? userData.ventas : null,

    }
    sql.query("INSERT INTO `ventas` SET ? ", [insertedData], function (err, res) {
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
User.editVentas = function (userData, result) {
    var data = {}
    console.log("userData--",userData)
    sql.query("SELECT * from ventas WHERE id=?", [userData.id], (error, res) => {
        if (error) {
            data['error'] = true;
            data['msg'] = error.code;
            data['body'] = [error];
            result(null, data);
        } else {
            if (res.length > 0) {
                var updatedData = {
                    codigoAuncliar: userData.codigoAuncliar ? userData.codigoAuncliar : res[0].codigoAuncliar,
                    fechaAuncliar: userData.fechaAuncliar ? userData.fechaAuncliar : res[0].fechaAuncliar,
                    numerodeDEX: userData.numerodeDEX ? userData.numerodeDEX : res[0].numerodeDEX,
                    faprobacion: userData.faprobacion ? userData.faprobacion : res[0].faprobacion,
                    fec_embarque: userData.fec_embarque ? userData.fec_embarque : res[0].fec_embarque,
                    fecha_deuda_externa_plan: userData.fecha_deuda_externa_plan ? userData.fecha_deuda_externa_plan : res[0].fecha_deuda_externa_plan,
                    fecha_deuda_externa: userData.fecha_deuda_externa ? userData.fecha_deuda_externa : res[0].fecha_deuda_externa,
                    plan: userData.plan ? userData.plan : res[0].plan,
                    compania_exportadora: userData.compania_exportadora ? userData.compania_exportadora : res[0].compania_exportadora,
                    comprador: userData.comprador ? userData.comprador : res[0].comprador,
                    pais: userData.pais ? userData.pais : res[0].pais,
                    aduana: userData.aduana ? userData.aduana : res[0].aduana,
                    velor_fletes: userData.velor_fletes ? userData.velor_fletes : res[0].velor_fletes,
                    velor_seguro: userData.velor_seguro ? userData.velor_seguro : res[0].velor_seguro,
                    velor_otros_gastos: userData.velor_otros_gastos ? userData.velor_otros_gastos : res[0].velor_otros_gastos,
                    documento: userData.documento ? userData.documento : res[0].documento,
                    compania_sel: userData.compania_sel ? userData.compania_sel : res[0].compania_sel,
                    compania_do: userData.compania_do ? userData.compania_do : res[0].compania_do,
                    ventas: userData.ventas ? userData.ventas : res[0].ventas,
                    
                }
                sql.query("UPDATE ventas SET ? WHERE id=?", [updatedData, userData.id], function (err, res1) {
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
User.getVentas = (userData, result) => {
    var data = {}
    var searchStr = '';
    if (userData.searchStr) {
        const text = userData.searchStr.toLowerCase();
        var searchStr = "(( codigoAuncliar like '" + userData.searchStr + "%') or ( fechaAuncliar like '" + userData.searchStr + "%') or ( numerodeDEX like '" + userData.searchStr + "%') or ( FAprobacion like '" + userData.searchStr + "%') or ( FecEmbarque like '" + userData.searchStr + "%') or ( uu.direccion like '" + userData.searchStr + "%')or ( uu.ciudad like '" + userData.searchStr + "%') or ( fechaDeudaExternaPlan like '" + userData.searchStr + "%') or ( fechaDeudaExterna like '" + userData.searchStr + "%')) or ( Plan like '" + userData.searchStr + "%')) or ( CompaniaExportadora like '" + userData.searchStr + "%')) or ( Comprador like '" + userData.searchStr + "%')) or ( Pais like '" + userData.searchStr + "%')) or ( Aduana like '" + userData.searchStr + "%')) or ( VelorFletes like '" + userData.searchStr + "%')) or ( VelorSeguro like '" + userData.searchStr + "%')) or ( VelorOtrosGastos like '" + userData.searchStr + "%')) or ( Documento like '" + userData.searchStr + "%')) or ( CompaniaSel like '" + userData.searchStr + "%')) or ( CompaniaDO like '" + userData.searchStr + "%')) or ( ventas like '" + userData.searchStr + "%')) and";
        if (userData.searchStr == '') {
            var searchStr = '';
        }
    }
    var pageNo = userData.pageNo
    var limitNum = parseInt(userData.limitNum ? userData.limitNum : 10);
    var startNum = pageNo == 0 ? 0 : parseInt(pageNo) * limitNum;

    sql.query(`SELECT * FROM ventas where  ${searchStr} is_deleted ='0'`, [limitNum, startNum], (error, res) => {
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
User.getVentasById = (userData, result) => {
    var data = {}
    sql.query("SELECT * FROM `ventas` where id =? and is_deleted ='0'", [userData.id], (error, res) => {
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
User.deleteVentas = (userData, result) => {
    var data = {}
    sql.query("SELECT * from ventas WHERE id=?", [userData.id], (error, res) => {
        if (error) {
            data['error'] = true;
            data['msg'] = error.code;
            data['body'] = [error];
            result(null, data);
        } else {
            sql.query("UPDATE ventas SET is_deleted='1' WHERE id=?", [userData.id], function (err, res1) {
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

/////////Clienets//////////
User.addClientes = function (userData, result) {
    var data = {}
    
    var insertedData = {
        rut: userData.rut ? userData.rut : null,
        nombre: userData.nombre ? userData.nombre : null,
        ciudad: userData.ciudad ? userData.ciudad : null,
        direccion: userData.direccion ? userData.direccion : null,
        telefono: userData.telefono ? userData.telefono : null,
      
        // vencimiento: userData.vencimiento ? userData.vencimiento : null,

    }
    sql.query("INSERT INTO `clientes` SET ? ", [insertedData], function (err, res) {
        console.log(this.sql)
        console.log(err)
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
User.editClientes = function (userData, result) {
    var data = {}
    console.log(userData)
    sql.query("SELECT * from clientes WHERE id=?", [userData.id], (error, res) => {
        if (error) {
            data['error'] = true;
            data['msg'] = error.code;
            data['body'] = [error];
            result(null, data);
        } else {
            if (res.length > 0) {
                var updatedData = {
                    rut: userData.rut ? userData.rut : res[0].rut,
                    nombre: userData.nombre ? userData.nombre : res[0].nombre,
                    ciudad: userData.ciudad ? userData.ciudad : res[0].ciudad,
                    direccion: userData.direccion ? userData.direccion : res[0].direccion,
                    telefono: userData.telefono ? userData.telefono : res[0].telefono,
                }
                sql.query("UPDATE clientes SET ? WHERE id=?", [updatedData, userData.id], function (err, res1) {
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
User.deleteClientes = (userData, result) => {
    var data = {}
    sql.query("SELECT * from clientes WHERE id=?", [userData.id], (error, res) => {
        if (error) {
            data['error'] = true;
            data['msg'] = error.code;
            data['body'] = [error];
            result(null, data);
        } else {
            sql.query("UPDATE clientes SET is_deleted='1' WHERE id=?", [userData.id], function (err, res1) {
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
User.getClientes = (userData, result) => {
    var data = {}
    var searchStr = '';
    if (userData.searchStr) {
        const text = userData.searchStr.toLowerCase();
        var searchStr = "(( rut like '" + userData.searchStr + "%') or ( nombre like '" + userData.searchStr + "%') or ( ciudad like '" + userData.searchStr + "%') or ( direccion like '" + userData.searchStr + "%') or ( telefono like '" + userData.searchStr + "%')) and";
        if (userData.searchStr == '') {
            var searchStr = '';
        }
    }
    var pageNo = userData.pageNo
    var limitNum = parseInt(userData.limitNum ? userData.limitNum : 10);
    var startNum = pageNo == 0 ? 0 : parseInt(pageNo) * limitNum;

    sql.query(`SELECT * FROM clientes where  ${searchStr} is_deleted ='0'`, [limitNum, startNum], (error, res) => {
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
User.getClientesById = (userData, result) => {
    var data = {}
    sql.query("SELECT * FROM `clientes` where id =? and is_deleted ='0'", [userData.id], (error, res) => {
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