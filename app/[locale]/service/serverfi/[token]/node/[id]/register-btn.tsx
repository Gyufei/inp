import { useTranslations } from 'next-intl';

export function RegisterBtn() {
  const T = useTranslations('Common');

  function handleClick() {}

  return (
    <div onClick={handleClick} className="w-[200px] h-12 bg-white flex items-center cursor-pointer justify-center rounded-2xl">
      <span className="select-none font-hel text-[#070709] text-base leading-5">{T('Register')}</span>
    </div>
  );
}
