import { ArrowsRightLeftIcon, RectangleStackIcon } from '@heroicons/react/24/outline';
import IPIcon from '../icons/IPIcon';
// define a NavItem prop
export type NavItem = {
  label: string;
  href: string;
  icon: any;
};
export const defaultNavItems: NavItem[] = [
  {
    label: 'Transactions',
    href: '/transactions',
    icon: ArrowsRightLeftIcon,
  },
  {
    label: 'Collections',
    href: '/collections',
    icon: RectangleStackIcon,
  },
  {
    label: 'Assets',
    href: '/ipa',
    icon: IPIcon,
  },
  // TODO: remove register for sepolia until SDK / API is ready
  // {
  //   label: 'Register',
  //   href: '/register',
  //   icon: WrenchScrewdriverIcon,
  // },
];
