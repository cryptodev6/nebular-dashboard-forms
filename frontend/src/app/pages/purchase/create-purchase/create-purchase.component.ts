import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { DeclarationService } from '../../../service/declaration.service';
import { declarationType } from '../../../shared/types/declarationType';

@Component({
  selector: 'ngx-create-purchase',
  templateUrl: './create-purchase.component.html',
  styleUrls: ['./create-purchase.component.scss']
})
export class CreatePurchaseComponent implements OnInit {

  formFeildList: declarationType[] | undefined;
  x: any;
  Pais: any;
  id:any
  error: boolean = false;
  createProviderForm!: NgForm;
  headerTxt:any;
  update: any;

  body:any= {
    codigo_auxiliar:'',
    numero_facture:'',
    fecha_compra:'',
    proveedor:'',
    percentage_desc:'',
    compania:'west metals',
    adquiridas_a_titulo:'',
    CP:'',
    fecha_CP:'',
    tipo_de_compra:'',
    resolucion:'',
    fecha_pago:'',
    ciudad_regalias:''
  }
  resData: any;
  countryList: any;
  statelist: any[] =[];
  pickedStates:any[] =[];
  result: any;
  selectedValuedata: any;

  constructor( private declareList: DeclarationService, private route: ActivatedRoute,
    private toastrService: NbToastrService) {
      this.route.params.subscribe(
        res => {
          if (res) {
            console.log('route',res.id);
            this.id = res.id
          }
        }
      )
    this.formFeildList = [
      {
        name: 'codigo_auxiliar',
        title: 'Codigo Auxiliar',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'numero_facture',
        title: 'Numero Facture',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'fecha_compra',
        title: 'Fecha Compra',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'proveedor',
        title: 'Proveedor',
        inputType: 'list',
        width: 25,
        value: '',
        required:' Required',
        options: []
      },
      {
        name: 'percentage_desc',
        title: '% descuento a valor de IVA',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'compania',
        title: 'Compañia',
        inputType: 'text',
        width: 25,
        value: 'west metals',
        required:' Required'
      },
      {
        name: 'adquiridas_a_titulo',
        title: 'Adquiridas a titulo',
        inputType: 'list',
        width: 25,
        value: '',
        required:' Required',
        options:[]
      },
      {
        name: 'CP',
        title: 'CP',
        inputType: 'date',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'fecha_CP',
        title: 'fecha CP',
        inputType: 'list',
        width: 25,
        value: '',
        required:' Required',
        options:[]
      },
      {
        name: 'tipo_de_compra',
        title: 'Tipo de compra',
        inputType: 'list',
        width: 25,
        value: '',
        required:' Required',
        options:[]
      },
      {
        name: 'resolucion',
        title: 'Resolucion',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
    ]
  }

  ngOnInit(): void {
    this.getData();
    if(this.id !=undefined){
      this.headerTxt = 'Edit Purchase';
    }
    else{
      this.headerTxt = 'Create Purchase'
    }
  }

  validationcheck(){
    let invalidField = this.formFeildList?.filter((ele: declarationType) => !ele.value);
    return invalidField.length;
  }
  
  onSubmit(f: any) {
    if(this.validationcheck()) {
      return this.error = true;
    }
    const iconPrimaryConfig: NbIconConfig = {
      icon: 'done-all-outline',
      pack: 'eva',
      status: 'primary',
    };
    const iconDangerConfig: NbIconConfig = {
      icon: 'alert-circle-outline',
      pack: 'eva',
      status: 'danger',
    };

    this.formFeildList?.forEach((ele: declarationType) => {
       this.body[ele.name] = ele.value?? '';
    });

    this.declareList.addPurchase(this.body).subscribe(
      (result: any) => {
        this.toastrService.show('Successfully Added', result.msg, iconPrimaryConfig);
      },
      (error: any) => {
        this.toastrService.show('Required s are missing', error, iconDangerConfig);
      }
    );
    this.error = false;
    f.reset();

  }
  
  getData(){
    this.declareList.getDeclareData().subscribe(
      (result: any) => {
        this.result = result.body;
      },
      (error: any) => console.log(error.msg)
    );
  }

  pickProvider(event:any){
    console.log('dsfg',event);
    this.result.forEach(item =>{
      if( item.id == event){
        this.selectedValuedata = item
        // this.body['CP'] = item.updated_at
      }
      this.formFeildList.forEach((item:any)=>{
        
        if(item.name == 'CP'){
          console.log(item);
          item.value = this.selectedValuedata.updated_at
        }
      })
    })
    
  }
  
}
