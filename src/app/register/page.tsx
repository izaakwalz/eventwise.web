import { TextField } from '@/components/ui/input';

export default function Page() {
  return (
    <section className="mx-auto my-[78px] flex w-full max-w-[560px] flex-col items-center justify-center gap-6 rounded-3xl bg-ews-600 px-4 py-8 lg:px-6 lg:py-[82px]">
      <h1 className="text-[24px] font-semibold">Get Insured</h1>

      <TextField
        label="What is the average amount you have spent on an event?"
        type="number"
        name="avg_amount"
        placeholder="$0.00"
      />
    </section>
  );
}
