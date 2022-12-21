import { Component, OnInit, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}

@Component({
  selector: 'ngx-view-provider',
  templateUrl: './view-provider.component.html',
  styleUrls: ['./view-provider.component.scss']
})
export class ViewProviderComponent implements OnInit {

  // customColumn = 'name';
  // defaultColumns = [ 'size', 'kind', 'items' ];
  // allColumns = [ this.customColumn, ...this.defaultColumns ];

  //allColumns = ['CP', 'Fec.Aux.CP', 'Num.CP', 'Fec.CP', 'Proveedor'];
  allColumns = ['CP', 'FecAuxCP', 'NumCP', 'FecCP', 'Proveedor'];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    this.dataSource = this.dataSourceBuilder.create(this.getTableData());
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

  private data: TreeNode<any>[] = [
    {
      data: { CP: '1469', FecAuxCP: '03/10/2022', NumCP: '6401046522190', FecCP: '03/10/2022', Proveedor: 'INVERSIONES GUAMO'}
    },
    {
      data: { name: 'Projects', size: '1.8 MB', items: 5, kind: 'dir' },
    },
    {
      data: { name: 'Reports', kind: 'dir', size: '400 KB', items: 2 },
    },
    {
      data: { name: 'Other', kind: 'dir', size: '109 MB', items: 2 },
    },
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  getTableData() {
    return [
      {
        data: { CP: '1469', FecAuxCP: '03/10/2022', NumCP: '6401046522190', FecCP: '03/10/2022', Proveedor: 'INVERSIONES GUAMO'}
      },
      {
        data: { CP: '1469', FecAuxCP: '03/10/2022', NumCP: '6401046522190', FecCP: '03/10/2022', Proveedor: 'INVERSIONES GUAMO'}
      },
      {
        data: { CP: '1469', FecAuxCP: '03/10/2022', NumCP: '6401046522190', FecCP: '03/10/2022', Proveedor: 'INVERSIONES GUAMO'}
      },
      {
        data: { CP: '1469', FecAuxCP: '03/10/2022', NumCP: '6401046522190', FecCP: '03/10/2022', Proveedor: 'INVERSIONES GUAMO'}
      },
    ];
  }
}
