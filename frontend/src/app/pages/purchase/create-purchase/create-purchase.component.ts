import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { DeclarationService } from '../../../service/declaration.service';
import { declarationType } from '../../../shared/types/declarationType';
import { jqxDropDownButtonComponent } from 'jqwidgets-ng/jqxdropdownbutton';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { BaseComponent } from '../../../shared/components/base.component';
import { BroadcastService } from '../../../shared/services/broadcast.service';
import { RouteService } from '../../../shared/services/route.service';
import { forkJoin, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ngx-create-purchase',
  templateUrl: './create-purchase.component.html',
  styleUrls: ['./create-purchase.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePurchaseComponent extends BaseComponent implements OnInit, OnDestroy {
  public appSubscription: Subscription;
  formFeildList: declarationType[] | undefined;
  x: any;
  Pais: any;
  id: any
  error: boolean = false;
  createProviderForm!: NgForm;
  headerTxt: any;
  update: any;
  body: any = {
    id: 0,
    codigo_auxiliar: '',
    numero_facture: '',
    fecha_compra: '',
    proveedor: '',
    percentage_desc: '',
    compania: 'west metals',
    adquiridas_a_titulo: '',
    CP: '',
    fecha_CP: '',
    tipo_de_compra: '',
    resolucion: '',
    fecha_pago: '',
    ciudad_regalias: ''
  }
  resData: any;
  countryList: any;
  statelist: any[] = [];
  pickedStates: any[] = [];
  result: any;
  selectedProveedorData: any;
  selectedAdquiridasData: any;
  proveedorSource: any;
  adquiridasSource: any;
  proveedorDataAdapter: any;
  adquiridasDataAdapter: any;
  @ViewChild('providerGrid', { static: false }) providerGrid: jqxGridComponent;
  @ViewChild('providerDropdownButton', { static: false }) providerDropdownButton: jqxDropDownButtonComponent;
  @ViewChild('adquiridasGrid', { static: false }) adquiridasGrid: jqxGridComponent;
  @ViewChild('adquiridasDropdownButton', { static: false }) adquiridasDropdownButton: jqxDropDownButtonComponent;
  providerColumns: any[] =
    [
      { text: 'codigo proveedor', datafield: 'codigo_proveedor' },
      { text: 'codigo padre', datafield: 'codigo_padre' },
      { text: 'razon social', datafield: 'razon_social' },
      { text: 'ciudades', datafield: 'ciudades' },
      { text: 'pais', datafield: 'pais' },
      { text: 'direccion', datafield: 'direccion' },
      { text: 'ciudad', datafield: 'ciudad' },
      { text: 'telefono', datafield: 'telefono' }
    ];
  adquiridasColumns: any[] =
    [
      { text: 'name', datafield: 'name' }
    ];

  constructor(private declareList: DeclarationService,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    public broadCastService: BroadcastService,
    public routeService: RouteService,) {
    super(broadCastService, routeService);
    this.id = this.route.snapshot.params.id;
    this.formFeildList = [
      {
        name: 'codigo_auxiliar',
        title: 'Codigo Auxiliar',
        inputType: 'text',
        width: 25,
        value: '',
        required: ' Required'
      },
      {
        name: 'proveedor',
        title: 'Proveedor',
        inputType: 'list',
        width: 25,
        value: '',
        required: ' Required',
        options: []
      },
      {
        name: 'numero_facture',
        title: 'Numero Facture',
        inputType: 'text',
        width: 25,
        value: '',
        required: ' Required'
      },
      {
        name: 'fecha_compra',
        title: 'Fecha Compra',
        inputType: 'text',
        width: 25,
        value: '',
        required: ' Required'
      },
      {
        name: 'percentage_desc',
        title: '% descuento a valor de IVA',
        inputType: 'text',
        width: 25,
        value: '',
        required: ' Required'
      },
      {
        name: 'compania',
        title: 'Compañia',
        inputType: 'text',
        width: 25,
        value: 'west metals',
        required: ' Required'
      },
      {
        name: 'adquiridas_a_titulo',
        title: 'Adquiridas a titulo',
        inputType: 'list',
        width: 25,
        value: '',
        required: ' Required',
        options: []
      },
      {
        name: 'CP',
        title: 'CP',
        inputType: 'number',
        width: 25,
        value: '',
        required: ' Required'
      },
      {
        name: 'fecha_CP',
        title: 'fecha CP',
        inputType: 'list',
        width: 25,
        value: '',
        required: ' Required',
        options: []
      },
      {
        name: 'tipo_de_compra',
        title: 'Tipo de compra',
        inputType: 'list',
        width: 25,
        value: '',
        required: ' Required',
        options: []
      },
      {
        name: 'resolucion',
        title: 'Resolucion',
        inputType: 'text',
        width: 25,
        value: '',
        required: ' Required'
      },
    ]
  }

  ngOnInit(): void {
    const result = forkJoin({
      proveedorList: this.declareList.getDeclareData()
    });

    this.appSubscription = result.subscribe((values) => {
      let proveedorList = values["proveedorList"];
      // Prepare Source
      this.proveedorSource = {
        localdata: proveedorList.body,
        datafields:
          [
            { name: 'id', type: 'number' },
            { name: 'codigo_proveedor', type: 'string' },
            { name: 'codigo_padre', type: 'string' },
            { name: 'razon_social', type: 'string' },
            { name: 'ciudades', type: 'string' },
            { name: 'pais', type: 'string' },
            { name: 'direccion', type: 'string' },
            { name: 'ciudad', type: 'string' },
            { name: 'telefono', type: 'string' }
          ],
        datatype: 'array'
      };
      this.proveedorDataAdapter = new jqx.dataAdapter(this.proveedorSource);
      this.providerDropdownButton.setContent('<div style="position: relative;margin-left:3px;margin-top:5px;">Select Proveedor</div>');

      // Adquiridas List
      this.adquiridasSource = {
        localdata: [],
        datafields:
          [
            { name: 'name', type: 'string' },
          ],
        datatype: 'array'
      };
      this.adquiridasDataAdapter = new jqx.dataAdapter(this.adquiridasSource);
      this.adquiridasDropdownButton.setContent('<div style="position: relative;margin-left:3px;margin-top:5px;">Select Adquiridas A Titulo</div>');

      if (this.id > 0) {
        this.headerTxt = 'Edit Purchase';
        this.declareList.getPurchaseById(this.id)
          .pipe(finalize(() => { }))
          .subscribe(result => {
            if (result.body[0]) {
              Object.keys(result.body[0]).forEach((purchaseItemKey: string) => {
                this.formFeildList.forEach((item: any) => {
                  if (item.name === purchaseItemKey) {
                    item.value = result.body[0][purchaseItemKey];
                  }
                  if (item.name === 'adquiridas_a_titulo' && item.value) {
                    let dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + item.value + '</div>';
                    this.adquiridasDropdownButton.setContent(dropDownContent);
                    let selectedAdquiridasIndex = proveedorList.body.indexOf(x => x.codigo_proveedor === item.value);
                    if (selectedAdquiridasIndex) {
                      this.selectedAdquiridasData = proveedorList.body[selectedAdquiridasIndex];
                    }
                  }
                  if (item.name === 'proveedor' && item.value) {
                    let dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + item.value + '</div>';
                    this.providerDropdownButton.setContent(dropDownContent);
                    let selectedProviderIndex = proveedorList.body.indexOf(x => x.codigo_proveedor === item.value);
                    if (selectedProviderIndex) {
                      this.selectedProveedorData = proveedorList.body[selectedProviderIndex];
                      this.providerGrid.selectrow(selectedProviderIndex);
                    }
                  }
                })
              });
            }
          });
      }
      else {
        this.headerTxt = 'Create Purchase'
      }
    });
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
      this.declareList.updatePurchase(this.body).subscribe(
        (result: any) => {
          this.toastrService.show('Successfully Updated', result.msg, iconPrimaryConfig);
        },
        (error: any) => {
          this.toastrService.show('Required fields are missing', error, iconDangerConfig);
        }
      );
    }
    else {
      this.declareList.addPurchase(this.body).subscribe(
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

  public providerGridOnRowSelect(event: any): void {
    let args = event.args;
    let row = this.providerGrid.getrowdata(args.rowindex);
    if (row) {
      let dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + row['codigo_proveedor'] + '</div>';
      this.providerDropdownButton.setContent(dropDownContent);
      this.selectedProveedorData = row;
      this.formFeildList.forEach((item: any) => {
        if (item.name == 'CP' && this.selectedProveedorData.updated_at) {
          item.value = this.selectedProveedorData.updated_at
        }
        else if (item.name === 'proveedor') {
          item.value = row['codigo_proveedor'];
        }
      });
      this.body.proveedor = row['codigo_proveedor'];
    }
  }

  public getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }
    return 850;
  }

  public adquiridasGridOnRowSelect(event: any): void {
    let args = event.args;
    let row = this.providerGrid.getrowdata(args.rowindex);
    console.log('selected adquiridas: ', row);
    if (row) {
      let dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + row['codigo_proveedor'] + '</div>';
      this.adquiridasDropdownButton.setContent(dropDownContent);
      this.selectedAdquiridasData = row;
      this.formFeildList.forEach((item: any) => {
        if (item.name === 'adquiridas_a_titulo') {
          item.value = row['codigo_proveedor'];
        }
      });
      this.body.proveedor = row['codigo_proveedor'];
    }
  }

  public ngOnDestroy() {
    if (this.appSubscription) {
      this.appSubscription.unsubscribe();
    }
  }
}
