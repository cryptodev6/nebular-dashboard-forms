import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/user/dashboard',
  },
  {
    title: 'Input',
    icon: 'layout-outline',
    children: [
      {
        title: 'Create Input',
        link: '/user/input/create-input',
      },
      {
        title: 'View Input',
        link: '/user/input/view-input',
      }
    ],
  },
  {
    title: 'Purchase',
    icon: 'briefcase-outline',
    children: [
      {
        title: 'Create Purchase',
        link: '/user/purchase/create-purchase',
      },
      {
        title: 'View Purchase',
        link: '/user/purchase/view-purchase',
      }
    ],
  },
  {
    title: 'Ventas',
    icon: 'keypad-outline',
    // link: '/user/close-cycle'
    children:[
      {
        title: 'Crear Ventas',
        link: '/user/ventas/create-ventas',
      },
      {
        title: 'Visualizar ventas',
        link: '/user/ventas/view-ventas',
      }
    ]
  },
  {
    title: 'Provider',
    icon: 'monitor-outline',
    children: [
      {
        title: 'Create provider',
        link: '/user/provider/create-provider',
      },
      {
        title: 'View provider',
        link: '/user/provider/view-provider',
      }
    ]
  },
  {
    title: 'Buyers',
    icon: 'browser-outline',
    children: [
      {
        title: 'Create buyers',
        link: '/user/buyers/create-buyers',
      },
      {
        title: 'View buyers',
        link: '/user/buyers/view-buyers',
      }
    ]
  }
];
