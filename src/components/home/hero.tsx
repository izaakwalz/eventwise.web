import { hero_banner } from '@/config/image';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="my-[104px] flex h-full w-full shrink-0 flex-col-reverse  items-center justify-center rounded-3xl bg-ews-200/25 lg:h-[507px] lg:flex-row">
      <div className="inline-flex w-full flex-col  items-start justify-center gap-8 px-[18px] py-4 lg:py-[129px] lg:pl-[104px]">
        <h1 className="text-[18px]/[26px] font-bold text-ews-300 lg:text-[58px]/[76px]">
          Insure your event in a <span className="text-ews-200">smart way</span>
        </h1>
        <p>
          Business insurance can be tricky. Finding the right protection doesn’t have to be.
          Insurance can help you.{' '}
        </p>
      </div>
      <Image
        src={hero_banner}
        alt=""
        width={517}
        height={349}
        priority
        className="h-[101px] w-[150px] lg:h-[349px] lg:w-[517px]"
      />
    </section>
  );
}
