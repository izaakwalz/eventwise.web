'use client';

import { useContractContext } from '@/hooks/connect-wallet';
import EventWise from '@/lib/EventWise';
import { getAddress, loadProvider } from '@/lib/web3-utils';
import { useEffect, useState } from 'react';

export default function Page() {
  const [events, setEvents] = useState<any>();
  const {
    account: { address, provider }
  } = useContractContext();

  // console.log(address);

  // const events = new EventWise(provider && provider, address && address).viewUserEvents();

  async function getEvents(provider: any, address: any) {
    let events = await new EventWise(provider, address).viewUserEvents();
    setEvents(events);
  }

  useEffect(() => {
    if (provider && address) {
      getEvents(provider, address);
    }
  }, [provider, address]);

  console.log(events);

  return (
    <section className="grid w-full grid-cols-4 gap-[18px]">
      <div className="flex h-[224px] w-[234px] flex-col items-start gap-[18px] rounded-lg bg-ews-700/25 px-[27px] py-6">
        <p className="text-[16px] font-semibold">ABC Conference</p>

        <div className="flex w-full flex-col items-start gap-2 rounded-lg border border-ews-300 bg-white px-[11px] py-2 text-[12px]">
          <span>Date: October 15 - 17, 2023</span>
          <span>Attendees:</span>
          <span>Latitude:</span>
          <span>Longitude:</span>
          <span>Event cost:</span>
        </div>
      </div>
    </section>
  );
}
