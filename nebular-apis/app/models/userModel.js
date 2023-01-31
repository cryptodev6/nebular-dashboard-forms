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
        banco: userData.banco ? userData.banco : null,
        moneda: userData.moneda ? userData.moneda : null,
        incoterms: userData.incoterms ? userData.incoterms : null,
        lugar_incoterm: userData.lugar_incoterm ? userData.lugar_incoterm : null,
        // vencimiento: userData.vencimiento ? userData.vencimiento : null,
        forma_pago: userData.forma_pago ? userData.forma_pago : null,
        dias_pago: userData.dias_pago ? userData.dias_pago : null,
        condition: userData.condition ? userData.condition : null,
        otra: userData.otra ? userData.otra : null,
        retencion: userData.retencion ? userData.retencion : null,
        tipo_proveedor: userData.tipo_proveedor ? userData.tipo_proveedor : null,
        inter: userData.inter ? userData.inter : null,
        clasification: userData.clasification ? userData.clasification : null,
        porc: userData.porc ? userData.porc : null,
        compania: userData.compania ? userData.compania : null,
        lugar_embarque: userData.lugar_embarque ? userData.lugar_embarque : null,
       
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

                    banco: userData.banco ? userData.banco : res[0].banco,
                    moneda: userData.moneda ? userData.moneda : res[0].moneda,
                    incoterms: userData.incoterms ? userData.incoterms : res[0].incoterms,
                    lugar_incoterm: userData.lugar_incoterm ? userData.lugar_incoterm : res[0].lugar_incoterm,
                    forma_pago: userData.forma_pago ? userData.forma_pago : res[0].forma_pago,
                    dias_pago: userData.dias_pago ? userData.dias_pago : res[0].dias_pago,
                    condition: userData.condition ? userData.condition : res[0].condition,
                    otra: userData.otra ? userData.otra : res[0].otra,
                    retencion: userData.retencion ? userData.retencion : res[0].retencion,
                    tipo_proveedor: userData.tipo_proveedor ? userData.tipo_proveedor : res[0].tipo_proveedor,
                    inter: userData.inter ? userData.inter : res[0].inter,
                    clasification: userData.clasification ? userData.clasification : res[0].clasification,

                    porc: userData.porc ? userData.porc : res[0].porc,
                    compania: userData.compania ? userData.compania : res[0].compania,
                    lugar_embarque: userData.lugar_embarque ? userData.lugar_embarque : res[0].lugar_embarque,
                   
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
                        console.log("RES1===>",res1);
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
        var searchStr = "(( codigo_proveedor like '" + userData.searchStr + "%') or ( codigo_padre like '" + userData.searchStr + "%') or ( razon_social like '" + userData.searchStr + "%') or ( uu.ciudades like '" + userData.searchStr + "%') or ( uu.pais like '" + userData.searchStr + "%') or ( uu.direccion like '" + userData.searchStr + "%')or ( uu.ciudad like '" + userData.searchStr + "%') or ( uu.telefono like '" + userData.searchStr + "%') or ( uu.cuenta like '" + userData.searchStr + "%') or ( uu.fax like '" + userData.searchStr + "%') or ( uu.banco like '" + userData.searchStr + "%') or ( uu.moneda like '" + userData.searchStr + "%') or ( uu.incoterms like '" + userData.searchStr + "%') or ( uu.lugar_incoterm like '" + userData.searchStr + "%') or ( uu.forma_pago like '" + userData.searchStr + "%') or ( uu.dias_pago like '" + userData.searchStr + "%') or ( uu.condition like '" + userData.searchStr + "%') or ( uu.otra like '" + userData.searchStr + "%') or ( uu.retencion like '" + userData.searchStr + "%')    or ( uu.tipo_proveedor like '" + userData.searchStr + "%') or ( uu.inter like '" + userData.searchStr + "%') or ( uu.clasification like '" + userData.searchStr + "%') or ( uu.porc like '" + userData.searchStr + "%') or ( uu.compania like '" + userData.searchStr + "%') or ( uu.lugar_embarque like '" + userData.searchStr + "%') ) and";
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
        ciudad_regalias: userData.ciudad_regalias ? userData.ciudad_regalias : null,

        contacto: userData.contacto ? userData.contacto : null,
        valor_descuento: userData.valor_descuento ? userData.valor_descuento : null,
        rate: userData.rate ? userData.rate : null,
        rate_actual: userData.rate_actual ? userData.rate_actual : null,
        minimo_retencion: userData.minimo_retencion ? userData.minimo_retencion : null,
        valor_retefuente: userData.valor_retefuente ? userData.valor_retefuente : null,
        valor_iva: userData.valor_iva ? userData.valor_iva : null,
        numero_lote: userData.numero_lote ? userData.numero_lote : null,
        fecha_page: userData.fecha_page ? userData.fecha_page : null,
        ciudad_regalias: userData.ciudad_regalias ? userData.ciudad_regalias : null,
        valor_regalias: userData.valor_regalias ? userData.valor_regalias : null,
        no_Chargue: userData.no_Chargue ? userData.no_Chargue : null,
        titulo_minero: userData.titulo_minero ? userData.titulo_minero : null,

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
                   

                    contacto: userData.contacto ? userData.contacto : res[0].contacto,
                    valor_descuento: userData.valor_descuento ? userData.valor_descuento : res[0].valor_descuento,
                    rate: userData.rate ? userData.rate : res[0].rate,
                    rate_actual: userData.rate_actual ? userData.rate_actual : res[0].rate_actual,
                    minimo_retencion: userData.minimo_retencion ? userData.minimo_retencion : res[0].minimo_retencion,
                    valor_retefuente: userData.valor_retefuente ? userData.valor_retefuente : res[0].valor_retefuente,
                    valor_iva: userData.valor_iva ? userData.valor_iva : res[0].valor_iva,
                    numero_lote: userData.numero_lote ? userData.numero_lote : res[0].numero_lote,
                    fecha_page: userData.fecha_page ? userData.fecha_page : res[0].fecha_page,
                    ciudad_regalias: userData.ciudad_regalias ? userData.ciudad_regalias : res[0].ciudad_regalias,
                    valor_regalias: userData.valor_regalias ? userData.valor_regalias : res[0].valor_regalias,
                    no_Chargue: userData.no_Chargue ? userData.no_Chargue : res[0].no_Chargue,
                    titulo_minero: userData.titulo_minero ? userData.titulo_minero : res[0].titulo_minero
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
                        console.log("RES1===>",res1);
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
        var searchStr = "(( codigo_auxiliar like '" + userData.searchStr + "%') or ( numero_facture like '" + userData.searchStr + "%') or ( fecha_compra like '" + userData.searchStr + "%') or ( uu.proveedor like '" + userData.searchStr + "%') or ( uu.percentage_desc like '" + userData.searchStr + "%')     or ( uu.contacto like '" + userData.searchStr + "%') or ( uu.valor_descuento like '" + userData.searchStr + "%') or ( uu.rate like '" + userData.searchStr + "%') or ( uu.rate_actual like '" + userData.searchStr + "%') or ( uu.minimo_retencion like '" + userData.searchStr + "%') or ( uu.valor_retefuente like '" + userData.searchStr + "%') or ( uu.valor_iva like '" + userData.searchStr + "%') or ( uu.numero_lote like '" + userData.searchStr + "%') or ( uu.fecha_page like '" + userData.searchStr + "%') or ( uu.valor_regalias like '" + userData.searchStr + "%') or ( uu.no_Chargue like '" + userData.searchStr + "%') or ( uu.titulo_minero like '" + userData.searchStr + "%')) and";
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
    var data = {}
    var insertedData = {
        codigoAuncliar: userData.codigoAuncliar ? userData.codigoAuncliar : null,
        fechaAuncliar: userData.fechaAuncliar ? userData.fechaAuncliar : null,
        numerodeDEX: userData.numerodeDEX ? userData.numerodeDEX : null,
        FAprobacion: userData.FAprobacion ? userData.FAprobacion : null,
        FecEmbarque: userData.FecEmbarque ? userData.FecEmbarque : null,
        fechaDeudaExternaPlan: userData.fechaDeudaExternaPlan ? userData.fechaDeudaExternaPlan : null,
        fechaDeudaExterna: userData.fechaDeudaExterna ? userData.fechaDeudaExterna : null,
        Plan: userData.Plan ? userData.Plan : null,
        CompaniaExportadora: userData.CompaniaExportadora ? userData.CompaniaExportadora : null,
        Comprador: userData.Comprador ? userData.Comprador : null,
        Pais: userData.Pais ? userData.Pais : null,
        Aduana: userData.Aduana ? userData.Aduana : null,
        VelorFletes: userData.VelorFletes ? userData.VelorFletes : null,
        VelorSeguro: userData.VelorSeguro ? userData.VelorSeguro : null,
        VelorOtrosGastos: userData.VelorOtrosGastos ? userData.VelorOtrosGastos : null,
        Documento: userData.Documento ? userData.Documento : null,
        CompaniaSel: userData.CompaniaSel ? userData.CompaniaSel : null,
        CompaniaDO: userData.CompaniaDO ? userData.CompaniaDO : null,
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
    console.log(userData)
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
                    FAprobacion: userData.FAprobacion ? userData.FAprobacion : res[0].FAprobacion,
                    FecEmbarque: userData.FecEmbarque ? userData.FecEmbarque : res[0].FecEmbarque,
                    fechaDeudaExternaPlan: userData.fechaDeudaExternaPlan ? userData.fechaDeudaExternaPlan : res[0].fechaDeudaExternaPlan,
                    fechaDeudaExterna: userData.fechaDeudaExterna ? userData.fechaDeudaExterna : res[0].fechaDeudaExterna,
                    Plan: userData.Plan ? userData.Plan : res[0].Plan,
                    CompaniaExportadora: userData.CompaniaExportadora ? userData.CompaniaExportadora : res[0].CompaniaExportadora,
                    Comprador: userData.Comprador ? userData.Comprador : res[0].Comprador,
                    Pais: userData.Pais ? userData.Pais : res[0].Pais,
                    Aduana: userData.Aduana ? userData.Aduana : res[0].Aduana,
                    VelorFletes: userData.VelorFletes ? userData.VelorFletes : res[0].VelorFletes,
                    VelorSeguro: userData.VelorSeguro ? userData.VelorSeguro : res[0].VelorSeguro,
                    VelorOtrosGastos: userData.VelorOtrosGastos ? userData.VelorOtrosGastos : res[0].VelorOtrosGastos,
                    Documento: userData.Documento ? userData.Documento : res[0].Documento,
                    CompaniaSel: userData.CompaniaSel ? userData.CompaniaSel : res[0].CompaniaSel,
                    CompaniaDO: userData.CompaniaDO ? userData.CompaniaDO : res[0].CompaniaDO,
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
                        console.log("RES1===>",res1);
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

module.exports = User;