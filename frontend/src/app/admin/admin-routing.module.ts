import { CreatesBuyersComponent } from './buyers/create-buyers/create-buyers.component'; 
import { ViewProviderComponent } from './providers/view-provider/view-provider.component';
import { ViewPurchaseComponent } from './purchases/view-purchase/view-purchase.component'; 
import { CreatePurchaseComponent } from './purchases/create-purchase/create-purchase.component'; 
import { ViewInputComponent } from './inputs/view-input/view-input.component'; 
import { CreateInputComponent } from './inputs/create-input/create-input.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin/admin.component';
import { DashboardsComponent } from './dashboards/dashboard.component'; 
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { CreateProviderComponent } from './providers/create-provider/create-provider.component'; 
import { ViewsBuyersComponent } from './buyers/view-buyers/view-buyers.component';  
import { CloseCycleComponent } from './ventas/close-cycle/close-cycle.component'; 
import { VisualizerComponent } from './ventas/visualizer/visualizer.component';   

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    { path: 'dashboard', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: 'dashboard',
      component: DashboardsComponent,
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
          component:CloseCycleComponent
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
      path: 'buyers',
      component: null,
      children: [
        {
          path: 'create-buyers',
          component: CreatesBuyersComponent,
        },
        {
          path: 'view-buyers',
          component: ViewsBuyersComponent,
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
  exports: [RouterModule]
})
export class AdminRoutingModule { }
