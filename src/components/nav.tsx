import { logo } from '@/config/image';
import Image from 'next/image';
import ConnectWalletButton from './connect-wallet-button';
import DashboardButton from './DashboardButton';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="container mx-auto flex w-full max-w-screen-2xl items-center justify-between border-b border-[#D9D9D9] bg-[#F2F2F2] px-4 py-6 lg:px-[101px]">
      <Link href={'/'}>
        <Image src={logo} alt="event wise" width={166} height={24} className="" priority />
      </Link>
      <div className="flex items-center gap-5">
        <DashboardButton />
        <ConnectWalletButton />
      </div>
    </nav>
  );
}
