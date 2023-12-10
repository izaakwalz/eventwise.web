import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useContractContext } from '@/hooks/connect-wallet';
import EventWise from '@/lib/EventWise';
import { formatNumber } from '@/lib/utils';
import { SymbolIcon } from '@radix-ui/react-icons';
import { formatEther } from 'ethers';
import { useState } from 'react';

type ClaimProps = {
  eventId: string;
  eventCost: any;
};

export default function ClaimModal({ eventCost, eventId }: ClaimProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    account: { address, provider }
  } = useContractContext();

  async function handleCompleteClaim() {
    try {
      if (!provider && !address) {
        return;
      }

      setIsLoading(true);
      let completeClaim = await new EventWise(provider, address).completeClaim(eventId);
      console.log({ completeClaim });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center gap-2 rounded-[32px] border border-[#353A5A] bg-[#ACACAC] p-2 text-[14px]/[20px] font-medium text-white shadow-button">
          Complete Claim
        </button>
      </DialogTrigger>
      <DialogContent className="w-full bg-[#D8E2F7] px-[30px] py-[42px] lg:max-w-[620px]">
        <DialogHeader>
          <DialogTitle className="text-[24px] font-semibold text-ews-300">
            Cash out premium
          </DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.58] px-4 py-2 text-[18px]">
            You will receive a payment of ${formatNumber(formatEther(eventCost))} <br/>if the conditions of our insurance policy were met.
          </div>

          <div className="mt-4 flex items-center justify-center">
            <button
              className="flex items-center gap-2.5 rounded-full bg-ews-200 px-6 py-3 text-[1rem]/[1.25rem] font-medium shadow-button disabled:pointer-events-none disabled:bg-ews-200/60"
              onClick={handleCompleteClaim}
              disabled={isLoading}
            >
              {isLoading ? <SymbolIcon className=" h-3 w-3 animate-spin" /> : null} Claim
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
