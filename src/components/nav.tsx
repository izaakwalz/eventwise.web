import { logo } from "@/config/image";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between py-6 px-4 lg:px-[101px] max-w-screen-2xl w-full container bg-[#F2F2F2] border-b border-[#D9D9D9] mx-auto">
      <Image
        src={logo}
        alt="event wise"
        width={166}
        height={24}
        className=""
        priority
      />

      <button className=" inline-flex items-center gap-2.5 rounded-[32px] py-3 px-6 bg-ews-200 border border-ews-300 bg-ews-100/10 text-[16px]/[20px] text-ews-100 font-medium">
        Connect Wallet
      </button>
    </nav>
  );
}
