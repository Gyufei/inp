import Image from 'next/image';
import { useCurrentToken } from '@/lib/hook/use-current-token';

export default function GoToTokenWebsite() {
  const currentToken = useCurrentToken();

  return (
    <div className="flex h-12 rounded-2xl px-[28px] border border-solid border-[#7E7B7B] font-hel text-[#7E7B7B] items-center gap-x-3 cursor-pointer">
      <span>Get ${currentToken?.name}</span>
      <Image src="/icons/go-to.svg" width={20} height={20} alt="goto" />
    </div>
  );
}
