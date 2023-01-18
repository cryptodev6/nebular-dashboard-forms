import { Component, OnInit } from "@angular/core";
import { declarationType } from "../../../shared/types/declarationType";
import { DeclarationService } from "../../../service/declaration.service";
import { NbIconConfig, NbToastrService } from "@nebular/theme";
import { NgForm } from "@angular/forms";

@Component({
  selector: "ngx-create-provider",
  templateUrl: "./create-provider.component.html",
  styleUrls: ["./create-provider.component.scss"],
})
export class CreateProviderComponent implements OnInit {

  formFeildList: declarationType[] | undefined;
  myForm!: NgForm;

  constructor(
    private declareList: DeclarationService,
    private toastrService: NbToastrService
  ) {
    this,
      (this.formFeildList = [
        {
          name: "codigo_proveedor",
          title: "Codligo Proveedor",
          inputType: "number",
          width: 25,
          value: "",
        },
        {
          name: "codigo_padre",
          title: "Cod. Padre",
          inputType: "number",
          width: 25,
          value: "",
        },
        {
          name: "razon_social",
          title: "Razon Social",
          inputType: "text",
          width: 25,
          value: "",
        },
        {
          name: "ciudades",
          title: "Ciudades",
          inputType: "text",
          width: 25,
          value: "",
        },
        {
          name: "pais",
          title: "Pais",
          inputType: "list",
          width: 25,
          value: "",
        },
        {
          name: "direccion",
          title: "Direccion",
          inputType: "date",
          width: 25,
          value: "",
        },
        {
          name: "ciudad",
          title: "Ciudad",
          inputType: "text",
          width: 25,
          value: "",
        },
        {
          name: "telefono",
          title: "Telefono",
          inputType: "number",
          width: 25,
          value: "",
        },
        {
          name: "cuenta",
          title: "Cuenta",
          inputType: "number",
          width: 25,
          value: "",
        },
      ]);
  }

  ngOnInit(): void {}

  onSubmit(f: NgForm) {

    const iconPrimaryConfig: NbIconConfig = {
      icon: "done-all-outline",
      pack: "eva",
      status: "primary",
    };
    const iconDangerConfig: NbIconConfig = {
      icon: "alert-circle-outline",
      pack: "eva",
      status: "danger",
    };

    var output = {};
    this.formFeildList?.forEach((ele: declarationType) => {
      output = { ...output, ...{ [ele.name]: ele.value } };

    })
    console.log(this.formFeildList)
    console.log(output)


    this.declareList.create_Provider(output).subscribe(
      (result: any) => {
        this.toastrService.show("", result.message, iconPrimaryConfig);
        f.form.reset();
      },
      (error: any) => {
        this.toastrService.show("", error.error.error, iconDangerConfig);
      }
    );

};

}
