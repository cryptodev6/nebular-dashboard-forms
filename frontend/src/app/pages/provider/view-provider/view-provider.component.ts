import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbIconConfig, NbSortDirection, NbSortRequest, NbToastrService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { DeclarationService } from '../../../service/declaration.service';

interface TreeNode<T> {
  data: T;
}

interface PRDEntry {
  ciudad:any,
  ciudades:any,
  codigo_padre:any,
  codigo_proveedor:any,
  contacts:any,
  created_at:any,
  cuenta:any,
  direccion:any,
  fax:any,
  id:any,1
  is_deleted:any,
  pais:any,
  razon_social:any,
  telefono:any,
  updated_at:any,
}

@Component({
  selector: 'ngx-view-provider',
  templateUrl: './view-provider.component.html',
  styleUrls: ['./view-provider.component.scss']
})
export class ViewProviderComponent implements OnInit {
  
  defaultColumns = [ 'codigo_proveedor','codigo_padre', 'razon_social', 'ciudades', 'pais', 'ciudad', 'telefono', 'cuenta','Action',];
  allColumns = [ ...this.defaultColumns ];
  headerColumns = [
    'Codigo proveedor', 'Codigo padre', 'Razon social', 'Ciudades', 'Pais', 'Ciudad', 'Telefono', 'Cuenta','Action',
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
    this.declareList.getDeclareData().subscribe(
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
        console.log(mappedData);
        
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

    this.declareList.deleteProveedors(body).subscribe((res)=>{
      console.log('Cell Deleted');
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
