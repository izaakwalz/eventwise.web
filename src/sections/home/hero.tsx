import { hero_banner } from "@/config/image";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full flex  justify-center h-[507px] shrink-0 rounded-3xl bg-ews-200/25 my-[104px]">
      <div className="inline-flex items-start w-full  justify-center flex-col gap-8 py-[129px] pl-[104px]">
        <h1 className="text-[58px]/[76px] font-bold text-ews-300">
          Insure your event in a <span className="text-ews-200">smart way</span>
        </h1>
      </div>
      <Image src={hero_banner} alt="" width={517} height={349} priority />
    </section>
  );
}
