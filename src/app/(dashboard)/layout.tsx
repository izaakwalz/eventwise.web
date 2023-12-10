'use client';

import DashboardNav from '@/components/dashboard/dashboard-nav';
import AddEvent, { AddEventModalForm } from '@/components/dashboard/add-event';
import RequestClaim from '@/components/dashboard/request-claim';
import PayPremium, { PayPremiumModal } from '@/components/dashboard/pay-premium';
import ContractProvider, { useContractContext } from '@/hooks/connect-wallet';
import EventWise from '@/lib/EventWise';
import { useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { account } = useContractContext();
  const { address, provider, isAuthenticated } = account;
  const [userPolicy, setUserPolicy] = useState<any>(null);

  useEffect(() => {
    console.log('yyy', userPolicy?.avgEventCost);
  });

  const onConnected = async (address: string, provider: any) => {
    const policy = await new EventWise(provider, address).viewPolicy();

    if (policy?.isExists === false) {
      router.push('/register');
    } else {
      setUserPolicy(policy);
      router.push('/dashboard');
    }
  };

  useEffect(() => {
    if (address && provider) {
      onConnected(address, provider);
    }
  }, [address, provider]);

  return (
    <ContractProvider>
      <section className="hidden items-center gap-[18px] py-[100px] lg:flex">
        <div className="flex w-[615px] items-center rounded-lg bg-[#EAEAEA] px-8 py-[52px]">
          <h1 className="text-[42px]/[62px] font-bold">
            Insure your event in a <span className="text-ews-200">smart way</span>
          </h1>
        </div>

        <AddEvent />
        <RequestClaim />
        <PayPremium premiumAmount={userPolicy?.premiumAmount} />
      </section>

      <section className="my-6 flex h-[170px] flex-col items-center gap-6 rounded-lg bg-[#EAEAEA] px-[26px] pb-[40px] pt-[26px] lg:hidden">
        <h1 className="max-w-[210px] text-center text-[1.25rem] font-bold">
          Insure your event in a <span className="text-ews-200">smart way</span>
        </h1>

        <div className="flex items-center gap-3">
          <AddEventModalForm />
          <PayPremiumModal premiumAmount={userPolicy?.premiumAmount} />
        </div>
      </section>

      <DashboardNav />

      <main className="my-[32px]">{children}</main>
    </ContractProvider>
  );
}
