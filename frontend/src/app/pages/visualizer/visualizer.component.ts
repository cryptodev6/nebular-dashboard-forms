import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbIconConfig, NbSortDirection, NbSortRequest, NbToastrService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { DeclarationService } from '../../service/declaration.service';

interface TreeNode<T> {
  data: T;
}

interface PRDEntry {
  codigoAuncliar: any,
  fechaAuncliar: any,
  numerodeDEX: any,
  faprobacion: any,
  fec_embarque: any,
  comprador: any,
  fecha_deuda_externa: any,
  CP: any,
  pais: any,
  is_deleted: any,
  resolucion: any,
  updated_at: any,
}

@Component({
  selector: 'ngx-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {

  defaultColumns = [
    'codigoAuncliar', 'fechaAuncliar', 'numerodeDEX','faprobacion', 'comprador','fec_embarque', 'fecha_deuda_externa', 'pais','id', 'Action',
  ];
  allColumns = [...this.defaultColumns];
  headerColumns = [
    'Codigo Auncliar', 'Fecha Auncliar', 'Numero de DEX','Faprobacion', 'Compania','Fecha Deuda Externa Plan', 'Fecha Deuda Externa', 'Pais','CP', 'Action',
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
    this.declareList.getVentas().subscribe(
      (result: any) => {
        this.result = result.body;
        let mappedData: TreeNode<PRDEntry>[] = []
        if (this.result.length) {
          console.log("ssssssss",this.result);
          
          this.result.map(o => o.Action = '')
          this.result.map(item => {
            mappedData.push({ data: item });
          })
        }
        this.dataSource = this.dataSourceBuilder.create(mappedData);
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

    this.declareList.deleteVentas(body).subscribe((res) => {
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

