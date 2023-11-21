'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLink = [
  {
    title: 'Events overview',
    link: '/dashboard'
  },
  {
    title: 'Premium transactions',
    link: '/transactions'
  },

  {
    title: 'Claims',
    link: 'claims'
  }
];

export default function DashboardNav() {
  const pathname = usePathname();
  return (
    <section className="flex items-center justify-start gap-6">
      {navLink.map(nav => (
        <Link
          key={nav.link}
          href={nav.link}
          className={`flex items-start gap-2 px-1 text-[16px] font-light ${
            pathname === nav.link ? 'border-b border-ews-200 text-ews-200' : ''
          }`}
        >
          {nav.title}
        </Link>
      ))}
    </section>
  );
}
