import { GlobalServerContext } from '@/lib/GlobalServerContext';
import { useContext } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

function Footer() {
  const { lng } = useContext(GlobalServerContext);
  return (
    <footer className="min-h-[10rem] border-t">
      {/* @ts-expect-error Server Component */}
      <LanguageSwitcher currentLang={lng} />
    </footer>
  );
}

export default Footer;
