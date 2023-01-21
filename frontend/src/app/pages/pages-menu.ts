import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Input',
    icon: 'layout-outline',
    children: [
      {
        title: 'Create Input',
        link: '/pages/input/create-input',
      },
      {
        title: 'View Input',
        link: '/pages/input/view-input',
      }
    ],
  },
  {
    title: 'Purchase',
    icon: 'briefcase-outline',
    children: [
      {
        title: 'Create Purchase',
        link: '/pages/purchase/create-purchase',
      },
      {
        title: 'View Purchase',
        link: '/pages/purchase/view-purchase',
      }
    ],
  },
  {
    title: 'Close cycle',
    icon: 'keypad-outline',
    link: '/pages/close-cycle'
  },
  {
    title: 'Provider',
    icon: 'monitor-outline',
    children: [
      {
        title: 'Create provider',
        link: '/pages/provider/create-provider',
      },
      {
        title: 'View provider',
        link: '/pages/provider/view-provider',
      }
    ]
  },
  {
    title: 'Buyers',
    icon: 'browser-outline',
    children: [
      {
        title: 'Create buyers',
        link: '/pages/buyers/create-buyers',
      },
      {
        title: 'View buyers',
        link: '/pages/buyers/view-buyers',
      }
    ]
  }
];
