import logoSvg from '@/assets/logo.svg';
import { GlobalServerContext } from '@/lib/GlobalServerContext';
import Image from 'next/image';
import { useContext } from 'react';
import HeaderActions from './HeaderActions';
import Link from './Link';

function Header() {
  const { lng } = useContext(GlobalServerContext);
  return (
    <header className="sticky top-0 z-10 mb-4 h-16 bg-white/80 shadow backdrop-blur">
      <div className="container flex h-full items-center">
        <Link
          href="/"
          className="flex h-full items-center space-x-1 active:opacity-90"
        >
          <Image priority alt="Swordfish" src={logoSvg} width={40} />
          <span className="text-xl font-extrabold leading-10 tracking-tight">
            swordfish
          </span>
        </Link>
        {/* @ts-expect-error Server Component */}
        <HeaderActions lng={lng} />
      </div>
    </header>
  );
}

export default Header;
