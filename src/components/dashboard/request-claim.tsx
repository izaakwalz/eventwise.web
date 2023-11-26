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

export default function RequestClaim() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex h-[228px] w-[190px] flex-col items-center  justify-center gap-[29px] rounded-lg border border-black bg-[#EAEAEA] px-6 py-[28px]">
          <Image src={requestClaimImage} alt="" width={113} height={119} />

          <button className="inline-flex w-full items-center justify-center gap-2.5 rounded-3xl bg-[#E69FBD] p-2 text-[14px]/[20px] font-medium text-white">
            Request claim
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="w-full bg-[#D8E2F7] px-[30px] py-[42px] lg:max-w-[620px]">
        <DialogHeader>
          <DialogTitle className="text-[24px] font-semibold text-ews-300">
            Request claim
          </DialogTitle>
        </DialogHeader>
        <form className="flex w-full flex-col gap-4">
          <TextField label="Select reason for claim?" type="text" name="name" placeholder="Rain?" />

          <TextField
            label="What is the event date?"
            type="date"
            name="date"
            placeholder="MM/DD/YY"
          />

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <button className="inline-flex w-full items-center justify-center gap-2.5 rounded-3xl bg-ews-200 p-2 text-[14px]/[20px] font-medium text-white">
                Claim
              </button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
