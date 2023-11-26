export default function Page() {
  return (
    <div>
      <section className="grid w-full grid-cols-4 gap-[18px]">
        <div className="flex h-[230px] w-[234px] flex-col items-start gap-[18px] rounded-lg bg-ews-700/25 px-[27px] py-6">
          <p className="text-[16px] font-semibold">Cancellation due to adverse weather</p>

          <div className="flex w-full flex-col items-start gap-2 rounded-lg border border-ews-300 bg-white px-[11px] py-2 text-[12px]">
            <dl className="flex gap-[2px]">
              <dt className="font-bold">Event:</dt>
            </dl>
            <dl className="flex gap-[2px]">
              <dt className="font-bold">Date:</dt>
              <dd>October 17, 2023</dd>
            </dl>
            <dl className="flex gap-[2px]">
              <dt className="font-bold">Clam amount:</dt>
              <dd>$1,500</dd>
            </dl>
          </div>

          <div className="flex w-full items-start justify-between font-medium">
            <dt>Status</dt>
            <dd>Approved</dd>
          </div>
        </div>
      </section>
    </div>
  );
}
