import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { DeclarationService } from '../../../service/declaration.service';
import { declarationType } from '../../../shared/types/declarationType';

@Component({
  selector: 'ngx-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  formFeildList: declarationType[] | undefined;
  x: any;
  Pais: any;
  id: any
  error: boolean = false;
  createProviderForm!: NgForm;
  headerTxt: any;
  body: any = {
    rut: '',
    nombre: '',
    ciudad: '',
    direccion: '',
    telefono: '',
  }
  resData: any;
  countryList: any;
  statelist: any[] = [];
  pickedStates: any[] = [];

  constructor(private declareList: DeclarationService, private route: ActivatedRoute,
    private toastrService: NbToastrService) {
    this.route.params.subscribe(
      res => {
        if (res) {
          this.id = res.id
        }
      }
    )
    this.formFeildList = [
      {
        name: 'rut',
        title: 'RUT',
        inputType: 'text',
        width: 25,
        value: '',
        required: ' Required'
      },
      {
        name: 'nombre',
        title: 'Nombre',
        inputType: 'text',
        width: 25,
        value: '',
        required: ' Required'
      },
      {
        name: 'ciudad',
        title: 'Ciudad',
        inputType: 'text',
        width: 25,
        value: '',
        required: ' Required'
      },
      {
        name: 'direccion',
        title: 'Direccion',
        inputType: 'text',
        width: 25,
        value: '',
        required: ' Required',
        options: []
      },
      {
        name: 'telefono',
        title: 'Telefono',
        inputType: 'number',
        width: 25,
        value: '',
        required: ' Required',
        options: []
      },

    ]
  }

  ngOnInit(): void {
    if (this.id != undefined) {
      this.getClienteById();
      this.headerTxt = 'Edit Cliente';
    }
    else {
      this.headerTxt = 'Crear Cliente'
    }
  }

  validationcheck() {
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
      this.declareList.updateClientes(this.body).subscribe(
        (result: any) => {
          this.toastrService.show('Successfully Added', result.msg, iconPrimaryConfig);
        },
        (error: any) => {
          this.toastrService.show('Required fields are missing', error, iconDangerConfig);
        }
      );
    }

    else {
      this.declareList.addClientes(this.body).subscribe(
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
  }

  getClienteById() {
    this.declareList.getClientesById(this.id).subscribe((res) => {
      this.resData = res.body[0];
      this.formFeildList.map(item => {
        if (item.name && this.resData[item.name]) {
          console.log(item.name, this.resData[item.name])
          item.value = ([''].includes(item.name)) ? parseInt(this.resData[item.name]) : this.resData[item.name];
        }
        return item;
      });
    })
  }
}
