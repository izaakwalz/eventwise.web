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
import { SymbolIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

type ClaimProps = {
  events: any[];
  address: string;
  provider: any;
};

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

      <RequestClaimModal events={events} address={address} provider={provider} />
    </div>
  );
}

const initialData = {
  eventId: '',
  reason: ''
};

const RequestClaimModal = ({ events, provider, address }: ClaimProps) => {
  const [form, setForm] = useState(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (provider && address) {
        setIsLoading(true);
        // console.log(form);
        const res = await new EventWise(provider, address).registerClaim(form.eventId, form.reason);
        // console.log(res);
        setIsLoading(false);
        toast.success('Claim Requested!');
        return;
      }
    } catch (error) {
      toast.error('Something went wrong!');
      // console.log(error);
      return;
    }
  };

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
          <form onSubmit={onHandleSubmit} className="flex w-full flex-col gap-4">
            <label htmlFor={'reason'} className="flex w-full flex-col items-start gap-4">
              <p className="text-[18px] font-medium">Select reason for claim?</p>
            </label>
            <select
              name="reason"
              id="reason"
              className="flex w-full gap-2 rounded-lg border border-ews-300 bg-white px-4 py-2 text-[18px] placeholder:font-medium placeholder:text-ews-300/50"
              onChange={onChange}
              required
            >
              <option value="rain">Rain</option>
              <option value="flood">Flood</option>
              <option value="earthquakes">Earthquakes</option>
              <option value="wildfires">Wildfires</option>
              <option value="thunderstorms">Thunderstorms</option>
            </select>
            <label htmlFor="eveny_id" className="flex w-full flex-col items-start gap-4">
              <p className="text-[18px] font-medium">Select your event</p>
              <select
                name="eventId"
                id="event"
                className="flex w-full gap-2 rounded-lg border border-ews-300 bg-white px-4 py-2 text-[18px] placeholder:font-medium placeholder:text-ews-300/50"
                onChange={onChange}
                required
              >
                <option defaultValue="">Select ID</option>
                {events &&
                  events.map((event: any) => (
                    <option key={event.date} value={event.eventId}>
                      {event.name}
                    </option>
                  ))}
              </select>
            </label>

            <div className="mt-4 flex items-center justify-center">
              <button
                className="flex items-center gap-2.5 rounded-full bg-ews-200 px-6 py-3 text-[1rem]/[1.25rem] font-medium shadow-button"
                disabled={isLoading}
              >
                {isLoading ? <SymbolIcon className=" h-3 w-3 animate-spin" /> : null} Request
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
