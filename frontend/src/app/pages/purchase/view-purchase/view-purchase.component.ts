import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbIconConfig, NbSortDirection, NbSortRequest, NbToastrService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { DeclarationService } from '../../../service/declaration.service';

interface TreeNode<T> {
  data: T;
}

interface PRDEntry {
  codigo_auxiliar: any,
  numero_facture: any,
  fecha_compra: any,
  codigo_proveedor: any,
  percentage_desc: any,
  compania: any,
  adquiridas_a_titulo: any,
  CP: any,
  fecha_CP: any,
  tipo_de_compra: any,
  is_deleted: any,
  resolucion: any,
  updated_at: any,
}

@Component({
  selector: 'ngx-view-purchase',
  templateUrl: './view-purchase.component.html',
  styleUrls: ['./view-purchase.component.scss']
})
export class ViewPurchaseComponent implements OnInit {

  defaultColumns = [
    'codigo_auxiliar', 'numero_facture', 'fecha_compra', 'percentage_desc', 'compania', 'adquiridas_a_titulo', 'Action',
  ];
  allColumns = [...this.defaultColumns];
  headerColumns = [
    'Codigo Auxiliar', 'Numero Facture', 'Fecha Compra', 'Proveedor', '% descuento a valor de IVA', 'Compania', 'Adquiridas a Titulo', 'Action',
  ];
  result: any
  dataSource: NbTreeGridDataSource<PRDEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  data: any;

  constructor(private dialogService: NbDialogService, private dataSourceBuilder: NbTreeGridDataSourceBuilder<PRDEntry>,
    private declareList: DeclarationService, private toastrService: NbToastrService) {
    this.getData()
  }

  ngOnInit(): void {
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  getData() {
    this.declareList.getPurchase().subscribe(
      (result: any) => {
        this.result = result.body;
        let mappedData: TreeNode<PRDEntry>[] = []
        if (this.result.length) {
          this.result.map(o => o.Action = '')
          this.result.map(item => {
            mappedData.push({ data: item });
          })
        }
        this.dataSource = this.dataSourceBuilder.create(mappedData);
        console.log(mappedData);

      },
      (error: any) => console.log(error.msg)
    );
  }

  open(dialog: TemplateRef<any>, row: any) {
    this.dialogService.open(dialog, { context: row });
  }

  DelRow(id, ref: any) {
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
    let body = {
      id: id
    }

    this.declareList.deletePurchase(body).subscribe((res) => {
      console.log('Cell Deleted');
      this.toastrService.show('Row Deleted', res.msg, iconPrimaryConfig);
      this.getData();
      if (ref) {
        ref.close();
      }
    },
      (error: any) => {
        this.toastrService.show('Error', error, iconDangerConfig);
      })
  }

}
