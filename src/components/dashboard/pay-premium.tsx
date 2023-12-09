'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { payPremiumImage } from '@/config/image';
import { useContractContext } from '@/hooks/connect-wallet';
import EventWise from '@/lib/EventWise';
import { SymbolIcon } from '@radix-ui/react-icons';
import { formatEther } from 'ethers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PayPremium({ premiumAmount }: any) {
  return (
    <div className="flex h-[228px] w-[190px] flex-col items-center  justify-center gap-2 rounded-lg border border-black px-[14px] py-[28px]">
      <Image src={payPremiumImage} alt="" width={69} height={79} />

      <div className="flex flex-col items-center justify-center gap-1 p-2 text-center">
        <dt className="text-[10px] font-semibold">Upcoming payment date</dt>
        <dd className="text-[8px] font-semibold">
          Your next payment of ${premiumAmount ? formatEther(premiumAmount) : null} is due on
          November 15, 2023
        </dd>
      </div>
      <PayPremiumModal premiumAmount={premiumAmount ? formatEther(premiumAmount) : null} />
    </div>
  );
}

const PayPremiumModal = ({ premiumAmount }: { premiumAmount: any }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    account: { address, provider }
  } = useContractContext();

  async function handlePayPremium() {
    try {
      if (!provider && !address) {
        return;
      }

      setIsLoading(true);
      let payPremium = await new EventWise(provider, address).payPremium();
      console.log({ payPremium });
      setIsLoading(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center gap-2 rounded-[32px] border border-[#353A5A] bg-[#ACACAC] p-2 text-[14px]/[20px] font-medium text-white shadow-button">
          Pay premium
        </button>
      </DialogTrigger>
      <DialogContent className="w-full bg-[#D8E2F7] px-[30px] py-[42px] lg:max-w-[620px]">
        <DialogHeader>
          <DialogTitle className="text-[24px] font-semibold text-ews-300">Payment</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.58] px-4 py-2 text-[18px]">
            Amount due for the current premium payment ${premiumAmount}
          </div>

          <div className="mt-4 flex items-center justify-center">
            <button
              className="flex items-center gap-2.5 rounded-full bg-ews-200 px-6 py-3 text-[1rem]/[1.25rem] font-medium shadow-button"
              onClick={handlePayPremium}
              disabled={isLoading}
            >
              {isLoading ? <SymbolIcon className=" h-3 w-3 animate-spin" /> : null} Claim
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
