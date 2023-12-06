'use client';

import EventWise from '@/lib/EventWise';
import { TextField } from '@/components/ui/input';
import { useContractContext } from '@/hooks/connect-wallet';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { SymbolIcon } from '@radix-ui/react-icons';

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [avgAmount, setAvgAmount] = useState();
  const {
    account: { provider, address }
  } = useContractContext();

  const onConnected = async (address: string, provider: any) => {
    const policy = await new EventWise(provider, address).viewPolicy();
    if (policy?.isExists === true) {
      // notFound();
      router.push('/404');
      return;
    }
  };

  async function onSubmit(e: any) {
    e.preventDefault();
    try {
      if (provider && address) {
        setIsLoading(true);
        await new EventWise(provider, address).createPolicy(avgAmount);
        setIsLoading(false);
        router.push('/dashboard');
        return;
      }
    } catch (error) {
      toast.error('Something went wrong!');
      return;
    }
  }

  useEffect(() => {
    if (address && provider) {
      onConnected(address, provider);
    }
  }, [address, provider]);

  return (
    <section className="mx-auto my-[78px] flex w-full max-w-[560px] flex-col items-center justify-center gap-6 rounded-3xl bg-ews-600 px-4 py-8 lg:px-6 lg:py-[82px]">
      <h1 className="text-[24px] font-semibold">Get Insured</h1>
      <form onSubmit={onSubmit}>
        <TextField
          label="What is the average amount you have spent on an event?"
          type="number"
          name="avg_amount"
          placeholder="$0.00"
          value={avgAmount}
          onChange={(e: any) => setAvgAmount(e.target.value)}
        />

        <div className="mt-4 flex items-center justify-center">
          <button
            type="submit"
            className="inline-flex w-[250px] items-center justify-center gap-2.5 rounded-3xl bg-ews-200 p-2 text-[14px]/[20px] font-medium text-white"
            disabled={isLoading}
          >
            {isLoading ? <SymbolIcon className=" h-3 w-3 animate-spin" /> : null} Register
          </button>
        </div>
      </form>
    </section>
  );
}
