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
          className="inline-flex items-center gap-2.5 rounded-[32px] border border-ews-300 bg-ews-100/10 bg-ews-200 px-6 py-3 text-[16px]/[20px] font-medium text-ews-100"
          onClick={onConnected}
        >
          Dashboard
        </button>
      ) : null}
    </>
  );
};

export default DashboardButton;
