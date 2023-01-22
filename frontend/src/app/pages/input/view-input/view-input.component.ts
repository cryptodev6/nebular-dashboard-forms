import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'ngx-view-input',
  templateUrl: './view-input.component.html',
  styleUrls: ['./view-input.component.scss']
})
export class ViewInputComponent implements OnInit {

  customColumn = 'name';
  defaultColumns = [ 'size', 'kind', 'items' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) 
  {
    this.dataSource = this.dataSourceBuilder.create(this.data);
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

  private data: TreeNode<FSEntry>[] = [
    {
      data: { name: 'Projects', size: '1.8 MB', items: 5, kind: 'dir' },
    },
    {
      data: { name: 'Reports', kind: 'dir', size: '400 KB', items: 2 },
      // children: [
      //   {
      //     data: { name: 'Report 1', kind: 'dir', size: '100 KB', items: 1 },
      //     children: [
      //       { data: { name: 'report-1.doc', kind: 'doc', size: '100 KB' } },
      //     ],
      //   },
      //   {
      //     data: { name: 'Report 2', kind: 'dir', size: '300 KB', items: 2 },
      //     children: [
      //       { data: { name: 'report-2.doc', kind: 'doc', size: '290 KB' } },
      //       { data: { name: 'report-2-note.txt', kind: 'txt', size: '10 KB' } },
      //     ],
      //   },
      // ],
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

  ngOnInit(): void {
  }

}

@Component({
  selector: 'nb-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}
