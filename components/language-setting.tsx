'use client';

import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '@/app/navigation';

export default function LanguageSetting() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function toggleLang() {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: locale === 'en' ? 'zh' : 'en' }
    );
  }

  return (
    <div
      onClick={toggleLang}
      className="w-12 h-12 rounded-full flex items-center justify-center border border-solid border-[rgba(255,255,255,0.4)] text-base leading-5 text-white cursor-pointer"
    >
      {locale === 'en' ? 'EN' : '汉'}
    </div>
  );
}
