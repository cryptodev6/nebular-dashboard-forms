import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { DeclarationService } from '../../../service/declaration.service';
import { declarationType } from '../../../shared/types/declarationType';

@Component({
  selector: 'ngx-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.scss']
})
export class CreateProviderComponent implements OnInit {

  formFeildList: declarationType[] | undefined;
  x: any;
  Pais: any;
  id:any
  error: boolean = false;
  createProviderForm!: NgForm;
  headerTxt:any;
  body:any= {
    codigo_proveedor:'',
    codigo_padre:'',
    razon_social:'',
    ciudades:'',
    pais:'',
    direccion:'',
    ciudad:'',
    telefono:'',
    cuenta:'',
    fax:'',
    banco:'',
    moneda :'',
    incoterms :'',
    lugar_incoterm:'',
    forma_pago :'',
    dias_pago:'',
    condition:'',
    otra:'',
    retencion :'',
    tipo_proveedor :'',
    inter:'',
    clasification :'',
    porc:'', 
    compania:'',
    lugar_embarque:'',
   

  }
  resData: any;
  countryList: any;
  statelist: any[] =[];
  pickedStates:any;
  providerDropdownButton: any;
  providerGrid: any;
  adquiridasDropdownButton: any;
  adquiridasGrid: any;

  constructor( private declareList: DeclarationService, private route: ActivatedRoute,
    private toastrService: NbToastrService) {
      this.route.params.subscribe(
        res => {
          if (res) {
            console.log('route',res.id);
            // this.getProviderById();
            this.id = res.id
          }
        }
      )
    this.formFeildList = [
      {
        name: 'codigo_proveedor',
        title: 'Codligo Proveedor',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'codigo_padre',
        title: 'Cod. Padre',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'razon_social',
        title: 'Razon Social',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'pais',
        title: 'Pais',
        inputType: 'list',
        width: 25,
        value: '',
        required:' Required',
        options: []
      },
      {
        name: 'ciudades',
        title: 'Ciudades',
        inputType: 'list',
        width: 25,
        value: '',
        required:' Required',
        options: []
      },
      {
        name: 'direccion',
        title: 'Direccion',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'ciudad',
        title: 'Ciudad',
        inputType: 'list',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'telefono',
        title: 'Telefono',
        inputType: 'number',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'cuenta',
        title: 'Cuenta',
        inputType: 'number',
        width: 25,
        value: '',
        required:' Required'
      },


      // {
      //   name: 'resolucion',
      //   title: 'Resolucion de facturación',
      //   inputType: 'number',
      //   width: 25,
      //   value: '',
      //   required:' Required'
      // },
      // {
      //   name: 'vencimiento',
      //   title: 'Fecha de vencimiento',
      //   inputType: 'date',
      //   width: 25,
      //   value: '',
      //   required:' Required'
      // },
      // {
      //   name: 'prefijo',
      //   title: 'Prefijo ',
      //   inputType: 'text',
      //   width: 25,
      //   value: '',
      //   required:' Required'
      // },
      // {
      //   name: 'desde',
      //   title: 'Desde ',
      //   inputType: 'text',
      //   width: 25,
      //   value: '',
      //   required:' Required'
      // },
      // {
      //   name: 'hasta',
      //   title: 'Hasta',
      //   inputType: 'text',
      //   width: 25,
      //   value: '',
      //   required:' Required'
      // },


      {
        name: 'fax',
        title: 'Fax',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'banco',
        title: 'Banco',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'moneda',
        title: 'Moneda',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'incoterms',
        title: 'Incoterms',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'lugar_incoterm',
        title: 'Lugar Incoterm',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'forma_pago',
        title: 'Forma Pago',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'dias_pago',
        title: 'Dias Pago',
        inputType: 'number',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'condition',
        title: 'Condicion Proveedor',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'otra',
        title: 'Otra Proveedor',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'retencion',
        title: 'Retencion Fte',
        inputType: 'number',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'tipo_proveedor',
        title: 'Tipo Proveedor',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },

      {
        name: 'inter',
        title: 'Inter Company',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'clasification',
        title: 'Clasification',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'porc',
        title: 'Porc. Anticipo',
        inputType: 'number',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'compania',
        title: 'Compania',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'lugar_embarque',
        title: 'Lugar Embarque',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },


    ]
  }

  ngOnInit(): void {
    this.getCountry()
    this.getState()
    if(this.id !=undefined){
      this.getProviderById();
      this.headerTxt = 'Edit Provider';
    }
    else{
      this.headerTxt = 'Create Provider'
    }
  }

  validationcheck(){
    let invalidField = this.formFeildList?.filter((ele: declarationType) => !ele.value);
    return invalidField.length;
  }
  
  onSubmit(f: any) {
    
    
    if (this.validationcheck()) {
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
      this.body[ele.name] = ele.value ?? '';
    });

    if (this.id > 0) {
      this.body.id = parseInt(this.id);
      this.declareList.editProveedors(this.body).subscribe(
        (result: any) => {
          this.toastrService.show('Successfully Updated', result.msg, iconPrimaryConfig);
        },
        (error: any) => {
          this.toastrService.show('Required fields are missing', error, iconDangerConfig);
        }
      );
    }
    else {
      this.declareList.saveDeclareData(this.body).subscribe(
        (result: any) => {
          this.toastrService.show('Successfully Added', result.msg, iconPrimaryConfig);
        },
        (error: any) => {
          this.toastrService.show('Required fields are missing', error, iconDangerConfig);
        }
      );
    }
    this.error = false;
    f.reset();
    this.providerDropdownButton.setContent('');
    this.providerGrid.clearselection();

    this.adquiridasDropdownButton.setContent('');
    this.adquiridasGrid.clearselection();
  }

  
  getProviderById(){
    this.declareList.getProveedorsById(this.id).subscribe((res)=>{
      this.resData = res.body[0];
      this.formFeildList.map(item =>  {
        if(item.name && this.resData[item.name]) {
          console.log(item.name, this.resData[item.name])
            item.value = (['pais', 'ciudades'].includes(item.name))  ? parseInt(this.resData[item.name]) :this.resData[item.name]  ;
        }
        return item;
      });
      this.pickCountry(parseInt(this.resData['pais']), false);
    })
  }

  getCountry(){
    this.declareList.countryList().subscribe((res:any) =>{
      console.log('country',res.body);
      this.countryList = res.body;
    })
  }

  getState(){
    this.declareList.getStates().subscribe((res:any) =>{
      this.statelist = res.body;
      if(this.formFeildList[3].name == 'pais' && this.formFeildList[3].value) {
        this.pickCountry( this.formFeildList[3].value, false)
      }
    })
  }

  pickCountry(event:any, toempty = true) {
    if(toempty && this.formFeildList[4].name == 'ciudades') {
      this.formFeildList[4].value = '';
    }
    this.pickedStates = this.statelist.filter(item => item.country_id == event);
  }

}
