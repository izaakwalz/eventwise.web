'use client';

import { useContractContext } from '@/connect-wallet';
import { shortenAddress } from '@/lib/utils';

export default function ConnectWalletButton() {
  const { account, connectWallet, disconnect } = useContractContext();

  const { address, isAuthenticated } = account;

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
        <button
          className=" inline-flex items-center gap-2.5 rounded-[32px] border border-ews-300 bg-ews-100/10 bg-ews-200 px-6 py-3 text-[16px]/[20px] font-medium text-ews-100"
          onClick={disconnect}
        >
          {shortenAddress(address)}
        </button>
      )}
    </>
  );
}
