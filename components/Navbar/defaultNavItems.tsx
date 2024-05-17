import { ArrowsRightLeftIcon, RectangleStackIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
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
  {
    label: 'Register',
    href: '/register',
    icon: WrenchScrewdriverIcon,
  },
  {
    label: 'Validators',
    href: '/validators',
    icon: RectangleStackIcon,
  },
  {
    label: 'Stake',
    href: '/stake',
    icon: ArrowsRightLeftIcon,
  },
];
