import { logo } from '@/config/image';
import Image from 'next/image';
import ConnectWalletButton from './connect-wallet-button';

export default function Nav() {
  return (
    <nav className="container mx-auto flex w-full max-w-screen-2xl items-center justify-between border-b border-[#D9D9D9] bg-[#F2F2F2] px-4 py-6 lg:px-[101px]">
      <Image src={logo} alt="event wise" width={166} height={24} className="" priority />

      <ConnectWalletButton />
    </nav>
  );
}
