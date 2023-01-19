import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  error: boolean = false;
  createProviderForm!: NgForm;
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
    contacts:'',
  
  }

  constructor( private declareList: DeclarationService,
    private toastrService: NbToastrService) {
    this.formFeildList = [
      {
        name: 'codigo_proveedor',
        title: 'Codligo Proveedor',
        inputType: 'number',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'codigo_padre',
        title: 'Cod. Padre',
        inputType: 'number',
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
        name: 'ciudades',
        title: 'Ciudades',
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
        required:' Required'
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
        inputType: 'text',
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
      {
        name: 'fax',
        title: 'Fax',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
      {
        name: 'contacts',
        title: 'Contacts',
        inputType: 'text',
        width: 25,
        value: '',
        required:' Required'
      },
    ]
  }

  ngOnInit(): void {
    this.declareList.getDeclareData().subscribe(
      (result: any) => {
        console.log(result);
      },
      (error: any) => console.log(error.message)
    );
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

    this.declareList.saveDeclareData(this.body).subscribe(
      (result: any) => {
        console.log(result);
        
        this.toastrService.show('Successfully Added', result.message, iconPrimaryConfig);
      },
      (error: any) => {
        this.toastrService.show('Required s are missing', error, iconDangerConfig);
      }
    );
    this.error = false;
    f.reset();

  }

}
