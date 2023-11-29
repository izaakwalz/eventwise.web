'use client';

import EventWise from '@/lib/EventWise';
import { TextField } from '@/components/ui/input';
import { useContractContext } from '@/connect-wallet';
import { notFound } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const [avgAmount, setAvgAmount] = useState();

  const { account } = useContractContext();

  const { address } = account;

  async function onSubmit(e: any) {
    e.preventDefault();
    console.log({ address });
    console.log(account?.provider);
    const res = await new EventWise(account?.provider, address).createPolicy(avgAmount);
    console.log(res);
    // return;
  }

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

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-3xl bg-ews-200 p-2 text-[14px]/[20px] font-medium text-white"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
