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

export default function AddEvent() {
  return (
    <div className="flex h-[228px] w-[190px] flex-col items-center  justify-center gap-[29px] rounded-lg border border-black px-6 py-[28px]">
      <Image src={addEventImage} alt="" width={113} height={119} />

      <AddEventModalForm />
    </div>
  );
}

const AddEventModalForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="shadow-button inline-flex items-center justify-center gap-2 rounded-[32px] border border-[#353A5A] bg-ews-200 p-2 text-[14px]/[20px] font-medium text-white">
          Add an event
        </button>
      </DialogTrigger>
      <DialogContent className="w-full bg-[#D8E2F7] px-[30px] py-[42px] lg:max-w-[620px]">
        <DialogHeader>
          <DialogTitle className="text-[24px] font-semibold text-ews-300">Create Event</DialogTitle>
        </DialogHeader>
        <form className="flex w-full flex-col gap-4">
          <TextField
            label="What is your event name?"
            type="text"
            name="name"
            placeholder="Jon Doe"
          />

          <TextField
            label="What is the event cost?"
            type="number"
            name="event_cost"
            placeholder="$0.00"
          />

          <TextField label="Longitude" type="text" name="longitude" placeholder="00000" />

          <TextField label="Latitude" type="text" name="longitude" placeholder="00000" />

          <TextField
            label="Estimated number of attendees"
            type="number"
            name="no"
            placeholder="300"
          />
          <TextField
            label="What is the event date?"
            type="date"
            name="date"
            placeholder="MM/DD/YY"
          />

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <button className="inline-flex w-full items-center justify-center gap-2.5 rounded-3xl bg-ews-200 p-2 text-[14px]/[20px] font-medium text-white">
                Add Event
              </button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
