import { addEventImage, payPremiumImage, requestClaimImage } from '@/config/image';
import DashboardNav from '@/components/dashboard/dashboard-nav';
import Image from 'next/image';
import { Fragment } from 'react';
import AddEvent from '@/components/dashboard/add-event';
import RequestClaim from '@/components/dashboard/request-claim';
import PayPremium from '@/components/dashboard/pay-premium';
import ContractProvider from '@/hooks/connect-wallet';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContractProvider>
      <section className="flex items-center gap-[18px] py-[100px]">
        <div className="flex w-[615px] items-center rounded-lg bg-[#EAEAEA] px-8 py-[52px]">
          <h1 className="text-[42px]/[62px] font-bold">
            Insure your event in a <span className="text-ews-200">smart way</span>
          </h1>
        </div>

        <AddEvent />
        <RequestClaim />
        <PayPremium />
      </section>

      <DashboardNav />

      <main className="my-[32px]">{children}</main>
    </ContractProvider>
  );
}
