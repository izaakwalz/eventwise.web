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
import Image from 'next/image';

export default function PayPremium() {
  return (
    <div className="flex h-[228px] w-[190px] flex-col items-center  justify-center gap-2 rounded-lg border border-black px-[14px] py-[28px]">
      <Image src={payPremiumImage} alt="" width={69} height={79} />

      <div className="flex flex-col items-center justify-center gap-1 p-2 text-center">
        <dt className="text-[10px] font-semibold">Upcoming payment date</dt>
        <dd className="text-[8px] font-semibold">
          Your next payment of $500.00 is due on November 15, 2023
        </dd>
      </div>
      <PayPremiumModal />
    </div>
  );
}

const PayPremiumModal = () => {
  const {
    account: { address, provider }
  } = useContractContext();

  async function handlePayPremium() {
    try {
      if (provider && address) {
        // console.log({ address, provider });
        // return;
        await new EventWise(provider, address).payPremium();
        return;
      }
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
            Amount due for the current premium payment $500
          </div>

          <DialogFooter className="sm:justify-start">
            {/* <DialogClose asChild> */}
            <button
              onClick={handlePayPremium}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-3xl bg-ews-200 p-2 text-[14px]/[20px] font-medium text-white"
            >
              Claim
            </button>
            {/* </DialogClose> */}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
