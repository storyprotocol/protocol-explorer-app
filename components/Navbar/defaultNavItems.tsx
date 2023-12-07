import React from 'react';
import {
  ArrowsRightLeftIcon,
  PresentationChartBarIcon,
  PuzzlePieceIcon,
  RectangleGroupIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
// define a NavItem prop
export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};
export const defaultNavItems: NavItem[] = [
  {
    label: 'Overview',
    href: '/',
    icon: <PresentationChartBarIcon className="w-5 h-5 ml-0.5 shrink-0" />,
  },
  {
    label: 'Transactions',
    href: '/transactions',
    icon: <ArrowsRightLeftIcon className="w-5 h-5 ml-0.5 shrink-0" />,
  },
  {
    label: 'IP Orgs',
    href: '/ipo',
    icon: <RectangleGroupIcon className="w-5 h-5 ml-0.5 shrink-0" />,
  },
  {
    label: 'IP Assets',
    href: '/ipa',
    icon: <PuzzlePieceIcon className="w-5 h-5 ml-0.5 shrink-0" />,
  },
  {
    label: 'Admin',
    href: '/admin',
    icon: <WrenchScrewdriverIcon className="w-5 h-5 ml-0.5 shrink-0" />,
  },
];
