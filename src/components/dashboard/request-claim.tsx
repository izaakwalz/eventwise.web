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
import { addEventImage, requestClaimImage } from '@/config/image';
import Image from 'next/image';
import { TextField } from '../ui/input';
import { string } from 'zod';
import { useEffect, useState } from 'react';
import { useContractContext } from '@/hooks/connect-wallet';
import EventWise from '@/lib/EventWise';

export default function RequestClaim() {
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

  return (
    <div className="flex h-[228px] w-[190px] flex-col items-center  justify-center gap-[29px] rounded-lg border border-black px-6 py-[28px]">
      <Image src={requestClaimImage} alt="" width={113} height={119} />

      <RequestClaimModal events={events} />
    </div>
  );
}

const initialData = {
  id: '',
  reason: string
};

const RequestClaimModal = ({ events }: { events: any[] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center gap-2 rounded-[32px] border border-[#353A5A] bg-[#E69FBD] p-2 text-[14px]/[20px] font-medium text-white shadow-button">
          Request claim
        </button>
      </DialogTrigger>
      <DialogContent className="w-full bg-[#D8E2F7] px-[30px] py-[42px] lg:max-w-[620px]">
        <DialogHeader>
          <DialogTitle className="text-[24px] font-semibold text-ews-300">
            Request claim
          </DialogTitle>
        </DialogHeader>

        {events && events.length === 0 ? (
          <p>Please Register Your Event</p>
        ) : (
          <form className="flex w-full flex-col gap-4">
            <TextField
              label="Select reason for claim?"
              type="text"
              name="name"
              placeholder="Rain?"
              required
            />

            <select
              name=""
              id=""
              className="flex w-full gap-2 rounded-lg border border-ews-300 bg-white px-4 py-2 text-[18px] placeholder:font-medium placeholder:text-ews-300/50"
            >
              <option defaultValue="">Select ID</option>
              {events &&
                events.map((event: any) => <option value={event.name}>{event.name}</option>)}
            </select>
            <TextField
              label="What is the event date?"
              type="date"
              name="date"
              placeholder="MM/DD/YY"
              required
            />
            <div className="mt-4 flex items-center justify-center">
              <button className="flex items-center gap-2.5 rounded-full bg-ews-200 px-6 py-3 text-[1rem]/[1.25rem] font-medium shadow-button">
                Claim
              </button>
            </div>

            {/* <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <button className="inline-flex w-full items-center justify-center gap-2.5 rounded-3xl bg-ews-200 p-2 text-[14px]/[20px] font-medium text-white">
                  Claim
                </button>
              </DialogClose>
            </DialogFooter> */}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
