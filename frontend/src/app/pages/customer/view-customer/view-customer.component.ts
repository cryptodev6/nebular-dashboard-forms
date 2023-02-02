import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbIconConfig, NbSortDirection, NbSortRequest, NbToastrService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { DeclarationService } from '../../../service/declaration.service';

interface TreeNode<T> {
  data: T;
}

interface PRDEntry {
  rut:any,
  nombre:any,
  ciudad:any,
  direccion:any,
  telefono:any,

  created_at:any,
  id:any,1
  is_deleted:any,
  updated_at:any,
}

@Component({
  selector: 'ngx-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {
  // 'resolucion', 'vencimiento', 'prefijo', 'desde', 'hasta',
  defaultColumns = [ 'rut','nombre', 'ciudad', 'direccion', 'telefono','Action',];
  allColumns = [ ...this.defaultColumns ];
  headerColumns = [
    'Rut', 'Nombre', 'Ciudad', 'Direccion', 'Telefono','Action',
  ];
  result :any
  dataSource: NbTreeGridDataSource<PRDEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  data: any;

  constructor(private dialogService: NbDialogService, private dataSourceBuilder: NbTreeGridDataSourceBuilder<PRDEntry>,
    private declareList: DeclarationService,private toastrService: NbToastrService) {
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

  getData(){
    this.declareList.getClientes().subscribe(
      (result: any) => {
        this.result = result.body;
        let mappedData:TreeNode<PRDEntry>[] = []
        if(this.result.length) {
          this.result.map(o => o.Action = '')
          this.result.map(item => {
            mappedData.push({data : item});
          })
        }
        this.dataSource = this.dataSourceBuilder.create(mappedData);
        
      },
      (error: any) => console.log(error.message)
    );
  }

  open(dialog: TemplateRef<any>, row:any) {
    this.dialogService.open(dialog, { context: row });
  }

  DelRow(id, ref:any){
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
    let body={
      id:id
    }

    this.declareList.deleteClientes(body).subscribe((res)=>{
      this.toastrService.show('Row Deleted', res.msg, iconPrimaryConfig);
      this.getData();
      if(ref) {
        ref.close();
      }
    },
    (error: any) => {
      this.toastrService.show('Error', error, iconDangerConfig);
    })
  }
}
