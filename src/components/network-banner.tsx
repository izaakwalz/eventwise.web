'use client';

import { useContractContext } from '@/hooks/connect-wallet';
import Image from 'next/image';

export default function NetWorkBanner() {
  const { account } = useContractContext();

  const { address, isAuthenticated, isNetwork } = account;

  return (
    <>
      {isAuthenticated && address && !isNetwork ? (
        <div className="fixed bottom-0 z-30 w-full px-8 pb-6">
          <div className="bg-alt-500 relative isolate flex w-full items-center justify-center gap-x-6 rounded-xl px-6 py-2.5  sm:px-3.5">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <p className="text-grey-300 text-sm leading-6">
                You are connected to an unsupported chain
                <strong className="font-semibold"> Switch Network.</strong>
              </p>
              <div className="flex flex-1 justify-end gap-4"></div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
