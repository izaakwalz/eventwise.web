'use client';

import Web3 from 'web3';
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
import { addEventImage } from '@/config/image';
import Image from 'next/image';
import { TextField } from '../ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import EventWise from '@/lib/EventWise';
import { useContractContext } from '@/hooks/connect-wallet';
import { SymbolIcon } from '@radix-ui/react-icons';
import { formatDateToTimeStamp } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function AddEvent() {
  return (
    <div className="flex h-[228px] w-[190px] flex-col items-center  justify-center gap-[29px] rounded-lg border border-black px-6 py-[28px]">
      <Image src={addEventImage} alt="" width={113} height={119} />
      <AddEventModalForm />
    </div>
  );
}

const initialData = {
  name: '',
  cost: 0,
  lat: '',
  long: '',
  attendees: '',
  date: ''
};

const AddEventModalForm = () => {
  const router = useRouter();
  const [form, setForm] = useState(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    account: { address, provider }
  } = useContractContext();

  const onChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (provider && address) {
        setIsLoading(true);
        let _date = formatDateToTimeStamp(form.date);
        // console.log(form);
        const res = await new EventWise(provider, address).createEvent(
          form.name,
          form.lat,
          form.long,
          form.attendees,
          form.cost,
          _date
        );
        // console.log(res);
        setIsLoading(false);
        router.refresh();
        toast.success('Event added!');
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
        <button className="inline-flex items-center justify-center gap-2 rounded-[32px] border border-[#353A5A] bg-ews-200 p-2 text-[14px]/[20px] font-medium text-white shadow-button">
          Add an event
        </button>
      </DialogTrigger>
      <DialogContent className="w-full bg-[#D8E2F7] px-[30px] py-[42px] lg:max-w-[620px]">
        <DialogHeader>
          <DialogTitle className="text-[24px] font-semibold text-ews-300">Create Event</DialogTitle>
        </DialogHeader>
        <form className="flex w-full flex-col justify-center gap-4" onSubmit={onHandleSubmit}>
          <TextField
            label="What is your event name?"
            type="text"
            name="name"
            placeholder="Jon Doe"
            onChange={onChange}
            required
          />

          <TextField
            label="What is the event cost?"
            type="number"
            name="cost"
            placeholder="$0.00"
            onChange={onChange}
            required
          />

          <div className="flex space-x-4">
            <TextField
              label="Longitude"
              type="text"
              name="long"
              placeholder="00000"
              onChange={onChange}
              required
            />

            <TextField
              label="Latitude"
              type="text"
              name="lat"
              placeholder="00000"
              onChange={onChange}
              required
            />
          </div>

          <TextField
            label="Estimated number of attendees"
            type="number"
            name="attendees"
            placeholder="300"
            onChange={onChange}
          />
          <TextField
            label="What is the event date?"
            type="date"
            name="date"
            placeholder="MM/DD/YY"
            onChange={onChange}
            required
          />

          {/* <DialogFooter className="flex items-center justify-center"> */}
          {/* <DialogClose asChild> */}
          <div className="mt-4 flex items-center justify-center">
            <button
              className="flex items-center gap-2.5 rounded-full bg-ews-200 px-6 py-3 text-[1rem]/[1.25rem] font-medium shadow-button"
              disabled={isLoading}
            >
              {isLoading ? <SymbolIcon className=" h-3 w-3 animate-spin" /> : null} Register event
            </button>
          </div>
          {/* </DialogClose> */}
          {/* </DialogFooter> */}
        </form>
      </DialogContent>
    </Dialog>
  );
};
