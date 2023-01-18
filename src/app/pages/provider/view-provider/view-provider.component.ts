import { Component, OnInit, Input } from "@angular/core";
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from "@nebular/theme";
import { DeclarationService } from "../../../service/declaration.service";

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
  selector: "ngx-view-provider",
  templateUrl: "./view-provider.component.html",
  styleUrls: ["./view-provider.component.scss"],
})
export class ViewProviderComponent implements OnInit {
  // customColumn = 'name';
  // defaultColumns = [ 'size', 'kind', 'items' ];
  // allColumns = [ this.customColumn, ...this.defaultColumns ];

  //allColumns = ['CP', 'Fec.Aux.CP', 'Num.CP', 'Fec.CP', 'Proveedor'];
  allColumns = [
    "Codigo proveedor",
    "Codigo padre",
    "Razon social",
    "Ciudades",
    "Pais",
    "Direccion",
    "Ciudad",
    "Telefono",
    "Cuenta",
  ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private declareList: DeclarationService
  ) {
    this.dataSource = this.dataSourceBuilder.create(this.getTableData());
  }

  ngOnInit(): void {}

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
      data: {
        CP: "1469",
        FecAuxCP: "03/10/2022",
        NumCP: "6401046522190",
        FecCP: "03/10/2022",
        Proveedor: "INVERSIONES GUAMO",
      },
    },
    {
      data: { name: "Projects", size: "1.8 MB", items: 5, kind: "dir" },
    },
    {
      data: { name: "Reports", kind: "dir", size: "400 KB", items: 2 },
    },
    {
      data: { name: "Other", kind: "dir", size: "109 MB", items: 2 },
    },
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + nextColumnStep * index;
  }

  ListData: any;
  getTableData() {
    const data = {
      search_key: "",
    };
    this.declareList.get_Provider_List(data).subscribe(
      (result: any) => {
        console.log(result?.data?.rows);
        result?.data?.rows.map((data: any) => {
          const Data = data;
          // console.log(Data);
          this.ListData =   {
                Telefono: Data?.telefono,
                Ciudades: Data?.ciudades,
                Direccion: Data?.direccion,
                Pais: Data?.pais,
                Cuenta: Data?.cuenta,
              },
          console.log([{data: this.ListData}])
        });
        // this.toastrService.show("", result.message, iconPrimaryConfig);
      },
      (error: any) => {
        console.log(error);
        // this.toastrService.show("", error.error.error, iconDangerConfig);
      }
    );
    console.log(this.ListData);
    return this.ListData
  }
}
