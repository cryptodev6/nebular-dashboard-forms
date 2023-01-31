import { FormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgModule } from '@angular/core';
import { NbLayoutModule, NbMenuModule, NbThemeModule, NbInputModule, NbCardModule, NbSelectModule, NbDatepickerModule, NbButtonModule, NbToastrModule, NbTreeGridModule, NbCheckboxModule, NbAutocompleteModule, NbDialogModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { AdminComponent } from './admin/admin.component';
import { DashboardModule } from './dashboards/dashboard.module'; 
import { AdminRoutingModule } from './admin-routing.module'; 
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { CreateInputComponent } from './inputs/create-input/create-input.component'; 
import { ViewInputComponent } from './inputs/view-input/view-input.component'; 
import { CreatePurchaseComponent } from './purchases/create-purchase/create-purchase.component'; 
import { ViewPurchaseComponent } from './purchases/view-purchase/view-purchase.component'; 
import { CloseCycleComponent } from './ventas/close-cycle/close-cycle.component'; 
import { CreateProviderComponent } from './providers/create-provider/create-provider.component'; 
import { ViewProviderComponent } from './providers/view-provider/view-provider.component'; 
import { CreatesBuyersComponent } from './buyers/create-buyers/create-buyers.component';
import { ViewsBuyersComponent } from './buyers/view-buyers/view-buyers.component';  
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jqxDropDownButtonModule } from 'jqwidgets-ng/jqxdropdownbutton';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { VisualizerComponent } from './ventas/visualizer/visualizer.component';


@NgModule({ 
  imports: [
    CommonModule,
    AdminRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbInputModule,
    NbCardModule,
    NbAutocompleteModule,
    NbSelectModule,
    NbDialogModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbButtonModule,
    FormsModule,
    NbToastrModule.forRoot(),
    ReactiveFormsModule,
    NbTreeGridModule,
    NbCheckboxModule,
    jqxDropDownButtonModule,
    jqxGridModule
  ],
  declarations: [
    AdminComponent,
    CreateInputComponent,
    ViewInputComponent,
    CreatePurchaseComponent,
    ViewPurchaseComponent,
    CloseCycleComponent,
    CreateProviderComponent,
    ViewProviderComponent,
    CreatesBuyersComponent,
    ViewsBuyersComponent,
    VisualizerComponent,

  ],
})

export class AdminModule { }
