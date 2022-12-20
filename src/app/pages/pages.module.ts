import { FormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgModule } from '@angular/core';
import { NbLayoutModule, NbMenuModule, NbThemeModule, NbInputModule, NbCardModule, NbSelectModule, NbDatepickerModule, NbButtonModule, NbToastrModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { CreateInputComponent } from './input/create-input/create-input.component';
import { ViewInputComponent } from './input/view-input/view-input.component';
import { CreatePurchaseComponent } from './purchase/create-purchase/create-purchase.component';
import { ViewPurchaseComponent } from './purchase/view-purchase/view-purchase.component';
import { CloseCycleComponent } from './close-cycle/close-cycle.component';
import { CreateProviderComponent } from './provider/create-provider/create-provider.component';
import { ViewProviderComponent } from './provider/view-provider/view-provider.component';
import { CreateBuyersComponent } from './buyers/create-buyers/create-buyers.component';
import { ViewBuyersComponent } from './buyers/view-buyers/view-buyers.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbInputModule,
    NbCardModule,
    NbSelectModule,
    NbDatepickerModule.forRoot(),
    NbButtonModule,
    FormsModule,
    NbToastrModule.forRoot()
  ],
  declarations: [
    PagesComponent,
    CreateInputComponent,
    ViewInputComponent,
    CreatePurchaseComponent,
    ViewPurchaseComponent,
    CloseCycleComponent,
    CreateProviderComponent,
    ViewProviderComponent,
    CreateBuyersComponent,
    ViewBuyersComponent,
  ],
})
export class PagesModule {
}
