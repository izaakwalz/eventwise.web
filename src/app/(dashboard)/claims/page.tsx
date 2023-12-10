'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useContractContext } from '@/hooks/connect-wallet';
import EventWise from '@/lib/EventWise';
import { formatDate, formatNumber } from '@/lib/utils';
import { formatEther } from 'ethers';
import { useEffect, useState } from 'react';
import ClaimModal from './claim-modal';

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [claims, setClaims] = useState<any>();
  const {
    account: { address, provider }
  } = useContractContext();

  async function getClaims(provider: any, address: any) {
    setIsLoading(true);
    let claims = await new EventWise(provider, address).viewClaims();
    setIsLoading(false);
    setClaims(claims);
  }

  useEffect(() => {
    if (provider && address) {
      getClaims(provider, address);
    }
  }, [provider, address]);

  console.log(claims);

  return (
    <section className="grid w-full grid-cols-4 gap-[18px]">
      {claims && claims.length === 0 ? (
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
            : claims &&
              claims.map((claim: any, key: any) => (
                <div
                  key={key}
                  className="flex h-[280px] w-full flex-col items-start gap-[18px] rounded-l bg-ews-500 px-[27px] py-6"
                >
                  <p className="text-[16px] font-semibold capitalize">{claim.reason}</p>

                  <div className="flex w-full flex-col items-start gap-2 rounded-lg border border-ews-300 bg-white px-[11px] py-2 text-[12px]">
                    <dl className="flex gap-[2px]">
                      <dt className="font-bold">Event:</dt>
                      <dd>{claim.name}</dd>
                    </dl>
                    <dl className="flex gap-[2px]">
                      <dt className="font-bold">Date:</dt>
                      <dd>{formatDate(claim.eventDate)}</dd>
                    </dl>
                    <dl className="flex gap-[2px]">
                      <dt className="font-bold">Clam amount:</dt>
                      <dd>{formatNumber(formatEther(claim.eventCost))}</dd>
                    </dl>
                  </div>

                  <div className="flex w-full items-start justify-between font-medium">
                    <dt>Status</dt>
                    <dd>{claim.status}</dd>
                  </div>
                  <div className="my-3 flex w-full items-center justify-center">
                    <ClaimModal eventId={claim.eventId} eventCost={claim.eventCost} />
                  </div>
                </div>
              ))}
        </>
      )}
    </section>
  );
}
