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
    FAprobacion:'',
    FecEmbarque:'',
    fechaDeudaExternaPlan:'',
    fechaDeudaExterna:'',
    Plan:'',
    CompaniaExportadora:'',
    Comprador:'',
    Pais:'',
    Aduana :'',
    VelorFletes :'',
    VelorSeguro:'',
    VelorOtrosGastos :'',
    Documento:'' ,

    CompaniaSel :'',
    CompaniaDO :'',
    ventas:'',
    

  }
  resData: any;
  countryList: any;
  statelist: any[] =[];
  pickedStates:any[] =[];

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
        title: 'Codligo Proveedor',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'fechaAuncliar',
        title: 'Cod. Padre',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'numerodeDEX',
        title: 'Razon Social',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'FAprobacion',
        title: 'Pais',
        inputType: 'list',
        width: 25,
        value: '',
        required:' Required',
        options: []
      },
      {
        name: 'FecEmbarque',
        title: 'FecEmbarque',
        inputType: 'list',
        width: 25,
        value: '',
        required:' Required',
        options: []
      },
      {
        name: 'fechaDeudaExternaPlan',
        title: 'fechaDeudaExternaPlan',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'fechaDeudaExterna',
        title: 'fechaDeudaExterna',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'Plan',
        title: 'Plan',
        inputType: 'number',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'CompaniaExportadora',
        title: 'CompaniaExportadora',
        inputType: 'number',
        width: 25,
        value: '',
        required:' Required'
      },


      {
        name: 'Comprador',
        title: 'Comprador',
        inputType: 'number',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'Pais',
        title: 'Pais',
        inputType: 'date',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'Aduana',
        title: 'Aduana ',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'VelorFletes',
        title: 'VelorFletes ',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'VelorSeguro',
        title: 'VelorSeguro',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },


      {
        name: 'VelorOtrosGastos',
        title: 'VelorOtrosGastos ',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'Documento',
        title: 'Documento',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'CompaniaSel',
        title: 'CompaniaSel ',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'CompaniaDO',
        title: 'CompaniaDO',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'ventas',
        title: 'ventas ',
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
    // if(this.validationcheck()) {
    //   return this.error = true;
    // }
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

    this.declareList.addVentas(this.body).subscribe(
      (result: any) => {
        this.toastrService.show('Successfully Added', result.msg, iconPrimaryConfig);
      },
      (error: any) => {
        this.toastrService.show('Required s are missing', error, iconDangerConfig);
      }
    );
    console.log("ssssssss",this.declareList);
    
    if(this.id !=undefined){
      this.declareList.updateVentas(this.body).subscribe(
        (result: any) => {
          this.toastrService.show('Successfully Added', result.msg, iconPrimaryConfig);
          console.log("ediitttttprooovider",result);
          
        },
        (error: any) => {
          this.toastrService.show('Required s are missing', error, iconDangerConfig);
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
