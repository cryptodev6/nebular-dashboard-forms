import { Component, OnInit } from '@angular/core';
import { declarationType } from '../../../shared/types/declarationType';

@Component({
  selector: 'ngx-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.scss']
})
export class CreateProviderComponent implements OnInit {

  formFeildList: declarationType[] | undefined;

  constructor() {
    this, this.formFeildList = [
      {
        name: 'Codligo Proveedor',
        title: 'Codligo Proveedor',
        inputType: 'number',
        width: 25,
        value: ''
      },
      {
        name: 'Cod. Padre',
        title: 'Cod. Padre',
        inputType: 'number',
        width: 25,
        value: ''
      },
      {
        name: 'Razon Social',
        title: 'Razon Social',
        inputType: 'text',
        width: 25,
        value: ''
      },
      {
        name: 'Ciudades',
        title: 'Ciudades',
        inputType: 'text',
        width: 25,
        value: ''
      },
      {
        name: 'Pais',
        title: 'Pais',
        inputType: 'list',
        width: 25,
        value: ''
      },
      {
        name: 'Direccion',
        title: 'Direccion',
        inputType: 'date',
        width: 25,
        value: ''
      },
      {
        name: 'Ciudad',
        title: 'Ciudad',
        inputType: 'text',
        width: 25,
        value: ''
      },
      {
        name: 'Telefono',
        title: 'Telefono',
        inputType: 'number',
        width: 25,
        value: ''
      },
      {
        name: 'Cuenta',
        title: 'Cuenta',
        inputType: 'number',
        width: 25,
        value: ''
      },
    ]
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }

}
