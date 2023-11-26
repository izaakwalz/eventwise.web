import { DocumentIcon } from '@/components/Icons';
import Image from 'next/image';
import { ClaimYourInsurance, PayInsured, PayPremiums, RegisterInsurance } from './how-it-works';

export default function About() {
  return (
    <section className="w-full">
      <div className="flex items-center justify-center text-center lg:px-[103px]">
        <p className="text-[12px] lg:text-2xl">
          <span className="text-ews-200">EventWise</span> is an innovative insurance platform
          designed to provide comprehensive coverage for event planners and organizers utilizing
          Chain-link blockchain.
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-[18px] py-[52px] lg:grid-cols-2 lg:py-[100px] ">
        {/* <div className="w-full flex flex-col items-start gap-6 max-w-[610px] h-[379px] rounded-3xl py-10 px-[18px] bg-ews-700">
          <div className="flex items-center gap-4">
            <div className="p-[25px] bg-ews-200/25 rounded-full">
              <Image
                src={"/document_icon.svg"}
                width={24}
                height={24}
                alt="icon"
              />
            </div>
            <p className="text-[24px] font-medium">Register insurance</p>
          </div>
          <div className="py-2 px-4 shadow-card flex items-center justify-center gap-2 s-full rounded-xl border border-ews-300 bg-white text-[18px]">
            Event planners can easily register their events for insurance
            coverage.
          </div>
          <div className="py-2 px-4 shadow-card flex items-center justify-center gap-2 s-full rounded-xl border border-ews-300 bg-white text-[18px]/[26px]">
            They provide details about the event, such as date, location,
            expected attendance, and the types of coverage they require.
          </div>
        </div> */}
        <RegisterInsurance />
        <PayPremiums />
        <ClaimYourInsurance />
        <PayInsured />
      </div>
    </section>
  );
}
