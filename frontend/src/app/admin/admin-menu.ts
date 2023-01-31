import { NbMenuItem } from '@nebular/theme';

export const ADMINMENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/admin/dashboard',
  },
  {
    title: 'Input',
    icon: 'layout-outline',
    children: [
      {
        title: 'Create Input',
        link: '/admin/input/create-input',
      },
      {
        title: 'View Input',
        link: '/admin/input/view-input',
      }
    ],
  },
  {
    title: 'Purchase',
    icon: 'briefcase-outline',
    children: [
      {
        title: 'Create Purchase',
        link: '/admin/purchase/create-purchase',
      },
      {
        title: 'View Purchase',
        link: '/admin/purchase/view-purchase',
      }
    ],
  },
  {
    title: 'Ventas',
    icon: 'keypad-outline',
    // link: '/admin/close-cycle'
    children:[
      {
        title: 'Crear Ventas',
        link: '/admin/ventas/create-ventas',
      },
      {
        title: 'Visualizar ventas',
        link: '/admin/ventas/view-ventas',
      }
    ]
  },
  {
    title: 'Provider',
    icon: 'monitor-outline',
    children: [
      {
        title: 'Create provider',
        link: '/admin/provider/create-provider',
      },
      {
        title: 'View provider',
        link: '/admin/provider/view-provider',
      }
    ]
  },
  {
    title: 'Buyers',
    icon: 'browser-outline',
    children: [
      {
        title: 'Create buyers',
        link: '/admin/buyers/create-buyers',
      },
      {
        title: 'View buyers',
        link: '/admin/buyers/view-buyers',
      }
    ]
  }
];
