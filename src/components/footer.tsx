import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex w-full flex-col space-y-8 px-4 py-6 lg:px-[100px]">
      <div className="flex items-center justify-between">
        <Link href={'/'} className="font-nico text-[1.5rem] underline-offset-4  hover:underline">
          #chainlinkfallhackathon2023
        </Link>

        <ul className="flex items-center gap-6">
          <li>
            <Link href={'/'}></Link>Home
          </li>
          <li>
            <Link href={'/'}></Link>Github
          </li>
        </ul>
      </div>
      <div className="flex w-full items-center justify-center">
        <p>© 2023 Eventwise All Rights Reserved</p>
      </div>
    </footer>
  );
}
