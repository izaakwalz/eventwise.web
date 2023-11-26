import Image from 'next/image';

export const RegisterInsurance = () => (
  <div className="flex h-full w-full max-w-[610px] flex-col items-start gap-6 rounded-3xl bg-ews-700 px-[18px] py-10 lg:h-[379px]">
    <div className="flex items-center gap-4">
      <div className="rounded-full bg-ews-200/25 p-[25px]">
        <Image src={'/document_icon.svg'} width={24} height={24} alt="icon" />
      </div>
      <p className="text-[24px] font-medium">Register insurance</p>
    </div>
    <div className="s-full flex items-center justify-center gap-2 rounded-xl border border-ews-300 bg-white px-4 py-2 text-[18px] shadow-card">
      Event planners can easily register their events for insurance coverage.
    </div>
    <div className="s-full flex items-center justify-center gap-2 rounded-xl border border-ews-300 bg-white px-4 py-2 text-[18px]/[26px] shadow-card">
      They provide details about the event, such as date, location, expected attendance, and the
      types of coverage they require.
    </div>
  </div>
);

export const PayPremiums = () => (
  <div className="flex h-full w-full max-w-[610px] flex-col items-start gap-6 rounded-3xl bg-ews-400 px-[18px] py-10 lg:h-[379px]">
    <div className="flex items-center gap-4">
      <div className="rounded-full bg-ews-200/25 p-[25px]">
        <Image src={'/document_icon.svg'} width={24} height={24} alt="icon" />
      </div>
      <p className="text-[24px] font-medium">Pay premiums</p>
    </div>
    <div className="s-full flex items-center justify-center gap-2 rounded-xl border border-ews-300 bg-white px-4 py-2 text-[18px] shadow-card">
      Event planners can choose flexible premium payment intervals, whether it&apos;s monthly,
      quarterly, or annually.
    </div>
    <div className="s-full flex items-center justify-center gap-2 rounded-xl border border-ews-300 bg-white px-4 py-2 text-[18px]/[26px] shadow-card">
      The platform offers a variety of payment options for convenience.
    </div>
  </div>
);

export const ClaimYourInsurance = () => (
  <div className="flex h-full w-full max-w-[610px] flex-col items-start gap-6 rounded-3xl bg-ews-600 px-[18px] py-10 lg:h-[379px]">
    <div className="flex items-center gap-4">
      <div className="rounded-full bg-ews-200/25 p-[25px]">
        <Image src={'/document_icon.svg'} width={24} height={24} alt="icon" />
      </div>
      <p className="text-[24px] font-medium">Claim Your Insurance</p>
    </div>
    <div className="s-full flex items-center justify-center gap-2 rounded-xl border border-ews-300 bg-white px-4 py-2 text-[18px] shadow-card">
      In the unfortunate event of losses or unexpected disruptions, event planners can easily file
      insurance claims through the platform.
    </div>
    <div className="s-full flex items-center justify-center gap-2 rounded-xl border border-ews-300 bg-white px-4 py-2 text-[18px]/[26px] shadow-card">
      No need of documentation and details related to the incident.
    </div>
  </div>
);

export const PayInsured = () => (
  <div className="flex h-full w-full max-w-[610px] flex-col items-start gap-6 rounded-3xl bg-ews-500 px-[18px] py-10 lg:h-[379px]">
    <div className="flex items-center gap-4">
      <div className="rounded-full bg-ews-200/25 p-[25px]">
        <Image src={'/document_icon.svg'} width={24} height={24} alt="icon" />
      </div>
      <p className="text-[24px] font-medium">Claim Your Insurance</p>
    </div>
    <div className="s-full flex items-center justify-center gap-2 rounded-xl border border-ews-300 bg-white px-4 py-2 text-[18px] shadow-card">
      Upon approval of the insurance claim, Event-Wise promptly disburses the necessary compensation
      to the insured event planner.
    </div>
    <div className="s-full flex items-center justify-center gap-2 rounded-xl border border-ews-300 bg-white px-4 py-2 text-[18px]/[26px] shadow-card">
      Upon approval of the insurance claim, Event-Wise promptly disburses the necessary compensation
      to the insured event planner.
    </div>
  </div>
);
