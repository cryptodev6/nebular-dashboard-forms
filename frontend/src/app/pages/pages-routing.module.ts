import { CreateBuyersComponent } from './buyers/create-buyers/create-buyers.component';
import { ViewProviderComponent } from './provider/view-provider/view-provider.component';
import { ViewPurchaseComponent } from './purchase/view-purchase/view-purchase.component';
import { CreatePurchaseComponent } from './purchase/create-purchase/create-purchase.component';
import { ViewInputComponent } from './input/view-input/view-input.component';
import { CreateInputComponent } from './input/create-input/create-input.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { CreateProviderComponent } from './provider/create-provider/create-provider.component';
import { ViewBuyersComponent } from './buyers/view-buyers/view-buyers.component';
import { CloseCycleComponent } from './close-cycle/close-cycle.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';
import { ViewCustomerComponent } from './customer/view-customer/view-customer.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'input',
      component: null,
      children: [
        {
          path: 'create-input',
          component: CreateInputComponent,
        },
        {
          path: 'view-input',
          component: ViewInputComponent,
        },
      ],
    },
    {
      path: 'purchase',
      component: null,
      children: [
        {
          path: 'create-purchase',
          component: CreatePurchaseComponent,
        },
        {
          path: 'view-purchase',
          component: ViewPurchaseComponent,
        },
        {
          path:'edit-purchase/:id',
          component:CreatePurchaseComponent
        }
      ],
    },
    {
      path: 'ventas',
      component: null,
       children: [
        {
          path: 'create-ventas',
          component: CloseCycleComponent,
        },
        {
          path: 'view-ventas',
          component: VisualizerComponent,
        },
        {
          path:'edit-ventas/:id',
          component:CloseCycleComponent,
        }
      ],
    },
    {
      path: 'provider',
      component: null,
      children: [
        {
          path: 'create-provider',
          component: CreateProviderComponent,
        },
        {
          path: 'view-provider',
          component: ViewProviderComponent,
        },
        {
          path:'edit-provider/:id',
          component:CreateProviderComponent
        }
      ],
    },
    {
      path: 'customer',
      component: null,
      children: [
        {
          path: 'create-customer',
          component: CreateCustomerComponent,
        },
        {
          path: 'view-customer',
          component: ViewCustomerComponent,
        },
        {
          path:'edit-customer/:id',
          component:CreateCustomerComponent
        }
      ],
    },
    {
      path: 'buyers',
      component: null,
      children: [
        {
          path: 'create-buyers',
          component: CreateBuyersComponent,
        },
        {
          path: 'view-buyers',
          component: ViewBuyersComponent,
        },
      ],
    },
    {
      path: '**',
      component: NotFoundComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
