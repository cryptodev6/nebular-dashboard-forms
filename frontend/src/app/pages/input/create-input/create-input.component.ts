import { DeclarationService } from './../../../service/declaration.service';
import { declarationType } from '../../../shared/types/declarationType';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NbIconConfig, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-create-input',
  templateUrl: './create-input.component.html',
  styleUrls: ['./create-input.component.scss']
})
export class CreateInputComponent implements OnInit {

  formFeildList: declarationType[] | undefined;
  x: any;
  documento: any;
  error: boolean = false;
  myForm!: NgForm;
  constructor(
    private declareList: DeclarationService,
    private toastrService: NbToastrService
  ) {
    this.formFeildList = [
      {
        name: 'Declarante',
        title: 'Declarante',
        inputType: 'list',
        width: 25,
        value: '',
        required:''
      },
      {
        name: 'LugarDestFinal',
        title: 'Lugar Destino Final ',
        inputType: 'list',
        width: 25,
        value: '',
        required:''
      },
      {
        name: 'ValorFOBUSD',
        title: 'Valor total FOB USD',
        inputType: 'number',
        width: 25,
        value: 0,
        required:''
      },
      {
        name: 'valorTotalEexp',
        title: 'Valor total exportancoes USD',
        inputType: 'number',
        width: 25,
        value: 0,
        required:''
      },
      {
        name: 'VlrEintengrar',
        title: 'Vlr.reintengrar USD',
        inputType: 'number',
        width: 25,
        value: 0,
        required:''
      },
      {
        name: 'vanUSD',
        title: 'Total VAN USD',
        inputType: 'number',
        width: 25,
        value: 0,
        required:''
      },
      {
        name: 'totalSeries',
        title: 'Total Series',
        inputType: 'number',
        width: 25,
        value: 0,
        required:''
      },
      {
        name: 'bultos',
        title: 'Total número bultos',
        inputType: 'number',
        width: 25,
        value: 0,
        required:''
      },
      {
        name: 'pesoBrutoKgs',
        title: 'Total peso bruto Kgs',
        inputType: 'number',
        width: 25,
        value: 0,
        required:''
      },
      {
        name: 'NAuthoEmbarque',
        title: 'N° authorización Embarque',
        inputType: 'text',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'FAuthoEmbarque',
        title: 'F. authorización Embarqu',
        inputType: 'text',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'NSolicitudAuthoEmbarque',
        title: 'N° Solicitud authorización Embarque',
        inputType: 'text',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'FSolicitudAuthoEmbarque',
        title: 'F. Slicitud authorización Embarque',
        inputType: 'text',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'NManifiesho',
        title: 'N° Manifieato Carga',
        inputType: 'text',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'FManifiesho',
        title: 'F.MAnifiesho',
        inputType: 'list',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'Trasnporte',
        title: 'Transporte',
        inputType: 'list',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'PeriodoResiduous',
        title: 'Periodo de Residuous',
        inputType: 'list',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'CantibadEmbalaje',
        title: 'Cantibad Embalaje',
        inputType: 'number',
        width: 25,
        value: 0,
        required:''
      },
      {
        name: 'planCI',
        title: 'Plan CI',
        inputType: 'list',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'tipoDocTransorte',
        title: 'Tipo Documento Transporte',
        inputType: 'list',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'transportador',
        title: 'Transportador',
        inputType: 'list',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'formaPage',
        title: 'Forma de Pago',
        inputType: 'list',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'forulanoAntenor',
        title: 'No. Forulano Antenor',
        inputType: 'text',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'tipoDeclaracion',
        title: 'Tipo Declaración',
        inputType: 'list',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'codifoA',
        title: 'Código A',
        inputType: 'text',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'fechaA',
        title: 'Fecha A ',
        inputType: 'date',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'numeroDEX',
        title: 'Numero de DEX',
        inputType: 'number',
        width: 25,
        value: 0,
        required:''
      },
      {
        name: 'fAprobacion',
        title: 'F. Aprobacion',
        inputType: 'date',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'fecEmbarque',
        title: 'Fec. Embarque',
        inputType: 'date',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'fechaDeudaExterna',
        title: 'Fecha Deuda Externa',
        inputType: 'date',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'plan',
        title: 'Plan',
        inputType: 'list',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'comparador',
        title: 'Comparador',
        inputType: 'list',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'companyExportadora',
        title: 'Compañía Exportadora',
        inputType: 'list',
        width: 75,
        value: null,
        required:''
      },
      {
        name: 'pais',
        title: 'País',
        inputType: 'list',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'aduana',
        title: 'Aduana',
        inputType: 'list',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'valorFletes',
        title: 'Valor Fletes',
        inputType: 'number',
        width: 25,
        value: 0,
        required:''
      },
      {
        name: 'valorOtrosGastos',
        title: 'Valor Otros Gastos',
        inputType: 'number',
        width: 25,
        value: 0,
        required:''
      },
      {
        name: 'documento',
        title: 'Documento',
        inputType: 'file',
        width: 25,
        value: null,
        required: 'This field is required'
      },
      {
        name: 'comentario',
        title: 'Comentario',
        inputType: 'textarea',
        width: 75,
        value: null,
        required:''
      },
      {
        name: 'company',
        title: 'Compañía',
        inputType: 'list',
        width: 25,
        value: null,
        required:''
      },
      {
        name: 'Do',
        title: 'DO',
        inputType: 'text',
        width: 25,
        value: null,
        required:''
      },
    ];
  }

  ngOnInit(): void {
    this.declareList.getDeclareData().subscribe(
      (result: any) => {
        console.log(result);
      },
      (error: any) => console.log(error.message)
    );
  }

  ngAfterViewInit(): void {
    this.x = document.querySelectorAll('input[type="number"]');
    this.x.forEach((element: any) => {
      element.addEventListener('keydown', function (e: any) {
        var invalidChars: any = ['-', '+', 'e'];
        if (invalidChars.includes(e.key)) {
          e.preventDefault();
        }
      });
    });
  }

  onFileChange(event: any, data: declarationType) {
    this.documento = event.target.files;
  }
  onSubmit(f: NgForm) {
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

    if (!this.documento) {
      this.error = true;
    }
    var form_data = new FormData();
    var output = {};
    this.formFeildList?.forEach((ele: declarationType) => {
      output = { ...output, ...{ [ele.name]: ele.value } };
      if (ele.name !== 'documento') {
        if (ele.inputType !== 'date') form_data.append(ele.name, ele.value);
        else
          form_data.append(
            ele.name,
            ele.value !== null
              ? new Date(ele.value).toISOString().slice(0, 19)
              : ele.value
          );
      }
    });
    form_data.append('documento', this.documento && this.documento[0]);

    this.declareList.saveDeclareData(form_data).subscribe(
      (result: any) => {
        this.toastrService.show('Successfully Added', result.message, iconPrimaryConfig);
      },
      (error: any) => {
        this.toastrService.show('Required fields are missing', error.error.error, iconDangerConfig);
      }
    );
    this.documento = [];
    f.form.reset();
  }

}
