import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { DeclarationService } from '../../service/declaration.service'; 
import { declarationType } from '../../shared/types/declarationType'; 

@Component({
  selector: 'ngx-close-cycle',
  templateUrl: './close-cycle.component.html',
  styleUrls: ['./close-cycle.component.scss']
})
export class CloseCycleComponent implements OnInit {

  formFeildList: declarationType[] | undefined;
  closeCycleForm = new FormGroup({})

  // formFeildList!: declarationType[] | undefined;
  x: any;
  Pais: any;
  id:any
  error: boolean = false;
  createProviderForm!: NgForm;
  headerTxt:any;
  body:any= {
    codigoAuncliar:'',
    fechaAuncliar:'',
    numerodeDEX:'',
    faprobacion:'',
    fec_embarque:'',
    fecha_deuda_externa_plan:'',
    fecha_deuda_externa:'',
    plan:'',
    compania_exportadora:'',
    comprador:'',
    pais:'',
    aduana :'',
    velor_fletes :'',
    velor_seguro:'',
    velor_otros_gastos :'',
    documento:'' ,
    compania_sel :'',
    compania_do :'',
    ventas:'',
  }
  resData: any;
  countryList: any;
  statelist: any[] =[];
  pickedStates:any[] =[];
optionList  :any[] =['option1', "option2" ]
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
        name: 'codigoAuncliar',
        title: 'Codigo Auncliar',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'fechaAuncliar',
        title: 'Fecha Auncliar',
        inputType: 'date',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'numerodeDEX',
        title: '4. Numero de DEX',
        inputType: 'number',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'faprobacion',
        title: '997.F.Aprobacion',
        inputType: 'date',
        width: 25,
        value: '',
        required:' Required',
        options: []
      },
      {
        name: 'fec_embarque',
        title: 'Fec. Embarque',
        inputType: 'date',
        width: 25,
        value: '',
        required:' Required',
        options: []
      },
      {
        name: 'fecha_deuda_externa_plan',
        title: 'Fecha Deuda Externa Plan',
        inputType: 'date',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'fecha_deuda_externa',
        title: 'Fecha Deuda Externa',
        inputType: 'date',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'plan',
        title: 'Plan',
        inputType: 'list',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'compania_exportadora',
        title: '11. Compania Exportadora',
        inputType: 'list',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'comprador',
        title: '38. Comprador',
        inputType: 'list',
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
        required:' Required'
      },
      {
        name: 'aduana',
        title: 'Aduana',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'velor_fletes',
        title: '73. Velor Fletes',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'velor_seguro',
        title: '74. Velor Seguro',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },


      {
        name: 'velor_otros_gastos',
        title: '75. Velor Otros Gastos',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'ventas',
        title: 'Ventas ',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },    
      {
        name: 'documento',
        title: 'Documento',
        inputType: 'textarea',
        width: 75,
        value: '',
        required:' Required'
      }, 
      {
        name: 'compania_sel',
        title: 'Compania ',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'compania_do',
        title: 'Compania Do',
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
      this.headerTxt = 'Edit Ventas';
    }
    else{
      this.headerTxt = 'Crear Ventas'
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

    if (this.id > 0) {
      this.body.id = parseInt(this.id);
    this.declareList.updateVentas(this.body).subscribe(
      (result: any) => {
        this.toastrService.show('Successfully Added', result.msg, iconPrimaryConfig);
      },
      (error: any) => {
        this.toastrService.show('Required fields are missing', error, iconDangerConfig);
      }
    );
    console.log("ssssssss",this.declareList);
    }

    else {
      this.declareList.addVentas(this.body).subscribe(
        (result: any) => {
          this.toastrService.show('Successfully Added', result.msg, iconPrimaryConfig);
          console.log("ediitttttprooovider",result);
          
        },
        (error: any) => {
          this.toastrService.show('Required fields are missing', error, iconDangerConfig);
        }
      );
    }
    this.error = false;
    f.reset();

  }
  
  getProviderById(){
    this.declareList.getVentasById(this.id).subscribe((res)=>{
      this.resData = res.body[0];
      this.formFeildList.map(item =>  {
        if(item.name && this.resData[item.name]) {
          console.log(item.name, this.resData[item.name])
            item.value = (['pais'].includes(item.name))  ? parseInt(this.resData[item.name]) :this.resData[item.name]  ;
        }
        return item;
      });
      this.pickCountry(parseInt(this.resData['pais']), false);
    })
  }

  getCountry(){
    this.declareList.countryList().subscribe((res:any) =>{
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
    if(toempty && this.formFeildList[4].name == 'plan') {
      this.formFeildList[4].value = '';
    }
    this.pickedStates = this.statelist.filter(item => item.country_id == event);
  }

}
