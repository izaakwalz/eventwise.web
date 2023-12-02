'use client';
import EventWise from '@/lib/EventWise';
import Link from 'next/link';
import { useEffect } from 'react';

const DashboardButton = async (provider: any, address: any) => {
  const policy = await new EventWise(provider, address).viewPolicy();

  return (
    <Link href="/dashboard">
      <button className=" inline-flex items-center gap-2.5 rounded-[32px] border border-ews-300 bg-ews-100/10 bg-ews-200 px-6 py-3 text-[16px]/[20px] font-medium text-ews-100">
        Dashboard
      </button>
    </Link>
  );
};

export default DashboardButton;
