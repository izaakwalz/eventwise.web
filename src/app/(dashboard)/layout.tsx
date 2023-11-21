import { addEventImage, payPremiumImage, requestClaimImage } from '@/config/image';
import DashboardNav from '@/sections/dashboard/dashboard-nav';
import Image from 'next/image';
import { Fragment } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <section className="flex items-center gap-[18px] py-[100px]">
        <div className="flex w-[615px] items-center rounded-lg bg-[#EAEAEA] px-8 py-[52px]">
          <h1 className="text-[42px]/[62px] font-bold">
            Insure your event in a <span className="text-ews-200">smart way</span>
          </h1>
        </div>

        <div className="flex h-[228px] w-[190px] flex-col items-center  justify-center gap-[29px] rounded-lg border border-black bg-[#EAEAEA] px-6 py-[28px]">
          <Image src={addEventImage} alt="" width={113} height={119} />

          <button className="inline-flex w-full items-center justify-center gap-2.5 rounded-3xl bg-ews-200 p-2 text-[14px]/[20px] font-medium text-white">
            Add Event
          </button>
        </div>
        <div className="flex h-[228px] w-[190px] flex-col items-center  justify-center gap-[29px] rounded-lg border border-black bg-[#EAEAEA] px-6 py-[28px]">
          <Image src={requestClaimImage} alt="" width={113} height={119} />

          <button className="inline-flex w-full items-center justify-center gap-2.5 rounded-3xl bg-[#E69FBD] p-2 text-[14px]/[20px] font-medium text-white">
            Request claim
          </button>
        </div>
        <div className="flex h-[228px] w-[190px] flex-col items-center  justify-center gap-[29px] rounded-lg border border-black bg-[#EAEAEA] px-6 py-[28px]">
          <Image src={payPremiumImage} alt="" width={113} height={119} />

          <button className="inline-flex w-full items-center justify-center gap-2.5 rounded-3xl bg-[#ACACAC] p-2 text-[14px]/[20px] font-medium text-white">
            Pay premium
          </button>
        </div>
      </section>

      <DashboardNav />

      <main className="my-[32px]">{children}</main>
    </Fragment>
  );
}
