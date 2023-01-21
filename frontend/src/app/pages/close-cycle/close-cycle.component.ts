import { FooterComponent } from './../../@theme/components/footer/footer.component';
import { Component, OnInit } from '@angular/core';
import { declarationType } from '../../shared/types/declarationType';
import { FormGroup, FormControl } from '@angular/forms';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'ngx-close-cycle',
  templateUrl: './close-cycle.component.html',
  styleUrls: ['./close-cycle.component.scss']
})
export class CloseCycleComponent implements OnInit {

  formFeildList: declarationType[] | undefined;
  closeCycleForm = new FormGroup({})

  constructor() {
    this.closeCycleForm = new FormGroup({
      codigoAuncliar: new FormControl(''),
      fechaAuncliar: new FormControl(''),
      numerodeDEX: new FormControl(''),
      FAprobacion: new FormControl(''),
      FecEmbarque: new FormControl(''),
      fechaDeudaExternaPlan: new FormControl(''),
      fechaDeudaExterna: new FormControl(''),
      Plan: new FormControl(''),
      CompaniaExportadora: new FormControl(''),
      Comprador: new FormControl(''),
      Pais: new FormControl(''),
      Aduana: new FormControl(''),
      VelorFletes: new FormControl(''),
      VelorSeguro: new FormControl(''),
      VelorOtrosGastos: new FormControl(''),
      Documento: new FormControl(''),
      CompaniaSel: new FormControl(''),
      CompaniaDO: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.closeCycleForm.value)
  }
}
