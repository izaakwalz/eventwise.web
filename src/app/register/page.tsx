'use client';

import EventWise from '@/lib/EventWise';
import { TextField } from '@/components/ui/input';
import { useContractContext } from '@/hooks/connect-wallet';
import { notFound } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const [avgAmount, setAvgAmount] = useState();

  const { account } = useContractContext();

  async function onSubmit(e: any) {
    e.preventDefault();
    await new EventWise(account?.provider, account?.address).createPolicy(avgAmount);
    return;
  }

  if (account && account.policy?.isExist === true) {
    return notFound();
  }

  // const policy = await new EventWise(account?.provider, address).viewPolicy(address);
  // const events = await new EventWise(account?.provider, address).viewUserEvents(address);
  // console.log({ policy });
  // console.log({ events });

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
