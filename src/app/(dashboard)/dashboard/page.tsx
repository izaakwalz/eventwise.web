export default function Page() {
  return (
    <section className="grid w-full grid-cols-4 gap-[18px]">
      <div className="flex h-[224px] w-[234px] flex-col items-start gap-[18px] rounded-lg bg-ews-700/25 px-[27px] py-6">
        <p className="text-[16px] font-semibold">ABC Conference</p>

        <div className="flex w-full flex-col items-start gap-2 rounded-lg border border-ews-300 bg-white px-[11px] py-2 text-[12px]">
          <span>Date: October 15 - 17, 2023</span>
          <span>Attendees:</span>
          <span>Latitude:</span>
          <span>Longitude:</span>
          <span>Event cost:</span>
        </div>
      </div>
    </section>
  );
}