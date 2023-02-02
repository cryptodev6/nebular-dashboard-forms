import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  /*{
    title: 'Input',
    icon: 'layout-outline',
    children: [
      {
        title: 'Create input',
        link: '/pages/input/create-input',
      },
      {
        title: 'Visualize Input',
        link: '/pages/input/view-input',
      }
    ],
  },*/
  {
    title: 'Compras',
    icon: 'briefcase-outline',
    children: [
      {
        title: 'Crear Compras',
        link: '/pages/purchase/create-purchase',
      },
      {
        title: 'Visualizar Compras',
        link: '/pages/purchase/view-purchase',
      }
    ],
  },
  {
    title: 'Ventas',
    icon: 'keypad-outline',
    // link: '/pages/close-cycle'
    children:[
      {
        title: 'Crear Ventas',
        link: '/pages/ventas/create-ventas',
      },
      {
        title: 'Visualizar Ventas',
        link: '/pages/ventas/view-ventas',
      }
    ]
  },
  {
    title: 'Proveedores',
    icon: 'monitor-outline',
    children: [
      {
        title: 'Crear Proveedor',
        link: '/pages/provider/create-provider',
      },
      {
        title: 'Visualizar Proveedores',
        link: '/pages/provider/view-provider',
      }
    ]
  },
  {
    title: 'Clientes',
    icon: 'browser-outline',
    children: [
      {
        title: 'Crear Cliente',
        link: '/pages/customer/create-customer',
      },
      {
        title: 'Visualizar Clientes',
        link: '/pages/customer/view-customer',
      }
    ]
  }
  /*,
  {
    title: 'Compradores',
    icon: 'browser-outline',
    children: [
      {
        title: 'Crear Compradores',
        link: '/pages/buyers/create-buyers',
      },
      {
        title: 'Visualizar Compradores',
        link: '/pages/buyers/view-buyers',
      }
    ]
  }*/
];
