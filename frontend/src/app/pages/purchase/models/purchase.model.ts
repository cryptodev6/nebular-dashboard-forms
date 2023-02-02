export interface purchaseModel {
    id: number;
    codigo_auxiliar: string;
    numero_facture: string;
    fecha_compra: string;
    proveedor: string;
    percentage_desc: string;
    compania: string;
    adquiridas_a_titulo: string;
    CP: number;
    fecha_CP: string;
    tipo_de_compra: string;
    resolucion: string;
    fecha_pago: string;
    ciudad_regalias: string;
}
export interface purchaseModels {
    id: number;
    codigoAuncliar: string;
    fechaAuncliar: string;
    numerodeDEX: number;
    faprobacion: string;
    fec_embarque: string;
    fecha_deuda_externa_plan: string;
    fecha_deuda_externa: string;
    plan: string;
    compania_exportadora: string;
    comprador: string;
    pais: string;
    aduana: string;
    velor_fletes: string;
    velor_seguro: string;
    velor_otros_gastos: string;
    documento: string;
    compania_sel: string;
    compania_do: string;
    ventas: string;
}
export interface purchaseModel1 {
    id: number;
    rut:string,
    nombre:string,
    ciudad:string,
    direccion:string,
    telefono:number,
}
