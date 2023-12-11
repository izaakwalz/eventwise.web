'use client';

import { useContractContext } from '@/hooks/connect-wallet';
import EventWise from '@/lib/EventWise';
import { useRouter } from 'next/navigation';

const DashboardButton = () => {
  const router = useRouter();
  const { account } = useContractContext();
  const { address, provider, isAuthenticated } = account;

  const onConnected = async () => {
    if (address && provider) {
      const policy = await new EventWise(provider, address).viewPolicy();
      if (policy?.isExists === false) {
        router.push('/register');
      } else {
        router.push('/dashboard');
      }
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <button
          className="inline-flex items-center gap-2.5 rounded-s-[32px] border border-ews-300 bg-ews-600 px-3.5 py-1 text-[14px]/[20px] font-medium text-ews-300 hover:bg-ews-200 hover:text-ews-100 md:px-6 md:py-3 md:text-[16px]/[20px]"
          onClick={onConnected}
        >
          Dashboard
        </button>
      ) : null}
    </>
  );
};

export default DashboardButton;
