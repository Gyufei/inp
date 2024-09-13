import { useRouter } from '@/app/navigation';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export function RegisterBtn({ serverId }: { serverId: number }) {
  const T = useTranslations('Common');
  const router = useRouter();
  const params = useParams();

  function handleClick() {
    router.push(`/service/serverfi/${params.token}/node/new?ref=${serverId}`);
  }

  return (
    <div onClick={handleClick} className="w-[140px] h-12 bg-white flex items-center cursor-pointer justify-center rounded-2xl">
      <span className="select-none font-hel text-[#070709] text-base leading-5">{T('Register')}</span>
    </div>
  );
}
