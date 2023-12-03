'use client';

import DashboardNav from '@/components/dashboard/dashboard-nav';
import AddEvent from '@/components/dashboard/add-event';
import RequestClaim from '@/components/dashboard/request-claim';
import PayPremium from '@/components/dashboard/pay-premium';
import ContractProvider, { useContractContext } from '@/hooks/connect-wallet';
import EventWise from '@/lib/EventWise';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { account } = useContractContext();
  const { address, provider, isAuthenticated } = account;

  // if (isAuthenticated === true) {
  //   return router.push('/');
  // }

  const onConnected = async (address: string, provider: any) => {
    const policy = await new EventWise(provider, address).viewPolicy();

    if (policy?.isExists === false) {
      router.push('/register');
    }
    router.push('/dashboard');
  };

  useEffect(() => {
    if (address && provider) {
      onConnected(address, provider);
    }
  }, [address, provider]);

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
