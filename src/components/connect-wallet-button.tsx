'use client';

import { useContractContext } from '@/hooks/connect-wallet';
import { shortenAddress } from '@/lib/utils';

export default function ConnectWalletButton() {
  const { account, connectWallet, disconnect } = useContractContext();

  const { address, isAuthenticated, isNetwork } = account;

  return (
    <>
      {!isAuthenticated && !address ? (
        <button
          className=" inline-flex items-center gap-2.5 rounded-[32px] border border-ews-300 bg-ews-100/10 bg-ews-200 px-6 py-3 text-[16px]/[20px] font-medium text-ews-100"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      ) : (
        <>
          {isNetwork === false ? (
            <button
              className=" inline-flex items-center gap-2.5 rounded-[32px] border border-ews-300 bg-[#E69FBD40] px-6 py-3 text-[16px]/[20px] font-medium text-ews-100"
              onClick={disconnect}
            >
              Switch Network
            </button>
          ) : (
            <button
              className="inline-flex items-center gap-2.5 rounded-e-[32px] border border-ews-300 px-3.5 py-1 text-[14px]/[20px] font-medium text-ews-300 hover:bg-ews-600 md:px-6 md:py-3 md:text-[16px]/[20px]"
              onClick={disconnect}
            >
              {shortenAddress(address)}
            </button>
          )}
        </>
      )}
    </>
  );
}
