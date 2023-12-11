import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex w-full flex-col space-y-8 px-4 py-6 lg:px-[100px]">
      <div className="flex items-center justify-between">
        <a
          href={'https://devpost.com/software/eventwise'}
          className="font-nico text-[0.625rem] underline-offset-4 hover:text-ews-200 hover:underline md:text-[1.5rem]"
          target="_blank"
          rel="noopener noreferrer"
        >
          #chainlinkfallhackathon2023
        </a>

        <ul className="flex items-center gap-6 text-ews-300 ">
          <li>
            <Link href={'#'} className="hover:text-ews-200">
              Home
            </Link>
          </li>
          <li>
            <Link
              href={'https://github.com/izaakwalz/eventwise.web'}
              className="hover:text-ews-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex w-full items-center justify-center">
        <p>© 2023 Eventwise All Rights Reserved</p>
      </div>
    </footer>
  );
}
