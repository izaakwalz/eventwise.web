import { logo } from '@/config/image';
import Image from 'next/image';
import ConnectWalletButton from './connect-wallet-button';
import DashboardButton from './DashboardButton';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="container mx-auto flex w-full max-w-screen-2xl items-center justify-between border-b border-[#D9D9D9] bg-[#F2F2F2] px-2 py-6 lg:px-[101px]">
      <Link href={'/'}>
        <Image src={logo} alt="event wise" width={166} height={24} priority />
      </Link>
      <div className=" inline-flex rounded-[32px]">
        <DashboardButton />
        <ConnectWalletButton />
      </div>
    </nav>
  );
}
