import { Component } from '@angular/core';

import { ADMINMENU_ITEMS } from './admin-menu'; 

@Component({
  selector: 'ngx-admin',
  styleUrls: ['admin.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = ADMINMENU_ITEMS;
}
