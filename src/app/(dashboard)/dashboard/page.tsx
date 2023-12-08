'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useContractContext } from '@/hooks/connect-wallet';
import EventWise from '@/lib/EventWise';
import { formatDate, formatNumber } from '@/lib/utils';
import { formatEther } from 'ethers';
import { useEffect, useState } from 'react';

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<any>();
  const {
    account: { address, provider }
  } = useContractContext();

  async function getEvents(provider: any, address: any) {
    setIsLoading(true);
    let events = await new EventWise(provider, address).viewUserEvents();
    setIsLoading(false);
    setEvents(events);
  }

  useEffect(() => {
    if (provider && address) {
      getEvents(provider, address);
    }
  }, [provider, address]);

  // console.log(events);

  return (
    <section className="grid w-full grid-cols-4 gap-[18px]">
      {events && events.length === 0 ? (
        <p className="text-[1.125rem] font-medium">You don't have any registered event</p>
      ) : (
        <>
          {isLoading
            ? [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex h-[224px] w-full flex-col items-start gap-[18px] rounded-lg bg-ews-500 px-[27px] py-6"
                >
                  <Skeleton className="h-[40px] w-[210px]" />
                  <Skeleton className="h-[20px] w-[190px]" />
                  <Skeleton className="h-[20px] w-[180px]" />
                  <Skeleton className="h-[20px] w-[180px]" />
                  <Skeleton className="h-[20px] w-[160px]" />
                </div>
              ))
            : events &&
              events.map((event: any) => (
                <div
                  key={event.date}
                  className="flex h-[224px] w-full flex-col items-start gap-[18px] rounded-lg bg-ews-400 px-[27px] py-6"
                >
                  <p className="text-[16px] font-semibold capitalize">{event.name}</p>

                  <div className="flex w-full flex-col items-start gap-2 rounded-lg border border-ews-300 bg-white px-[11px] py-2 text-[12px]">
                    <div className="flex w-full justify-between">
                      <div>Date:</div> <div> {formatDate(event.date)}</div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div>Attendees:</div> <div> {event.attendees}</div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div>Latitude:</div> <div> {event.latitude}</div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div>Longitude:</div> <div> {event.longitude}</div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div>Event cost:</div> <div> ${formatNumber(formatEther(event.cost))}</div>
                    </div>
                  </div>
                </div>
              ))}
        </>
      )}
    </section>
  );
}
