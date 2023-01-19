import { Component, OnInit, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
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
  
  defaultColumns = [ 'codigo_proveedor','codigo_padre', 'razon_social', 'ciudades', 'pais', 'ciudad', 'telefono', 'cuenta'];
  allColumns = [ ...this.defaultColumns ];
  headerColumns = [
    'Codigo proveedor', 'Codigo padre', 'Razon social', 'Ciudades', 'Pais', 'Direccion', 'Ciudad', 'Telefono', 'Cuenta'
  ];
  result :any
  dataSource: NbTreeGridDataSource<PRDEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  data: any;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<PRDEntry>,private declareList: DeclarationService,) {
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
          this.result.map(item => {
            mappedData.push({data : item});
          })
        }
        this.dataSource = this.dataSourceBuilder.create(mappedData);
      },
      (error: any) => console.log(error.message)
    );
  }
}
