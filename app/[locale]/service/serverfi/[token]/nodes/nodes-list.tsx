'use client';

import Image from 'next/image';

import { useTranslations } from 'next-intl';
import { IServer, useServers } from '@/lib/api/use-servers';
import GoToTokenWebsite from '@/components/go-to-token-website';
import { Link } from '@/app/navigation';
import { useParams } from 'next/navigation';
import { formatNum, toPercent } from '@/lib/number';
import { ImageWithDefaultOnError } from '@/components/image-with-onError';
import TruncatedText from '@/components/truncated-text';
export function NodesList() {
  const T = useTranslations('Common');
  const params = useParams();

  const { data } = useServers();
  const servers = data?.filter((server) => server?.verified !== '0');

  return (
    <div className="mt-[152px] relative z-10">
      <div className="absolute top-[228px] w-[176px] h-[176px] bg-[#A57755] blur-[250px]"></div>
      <div className="flex absolute w-full -top-[68px] justify-between">
        <div
          className="w-[257px] h-[68px] bg-no-repeat flex items-center pl-6 text-2xl leading-9 text-white font-cal"
          style={{
            backgroundImage: "url('/images/1090.svg')",
          }}
        >
          {T('ServerNodes')}
        </div>
        <GoToTokenWebsite />
      </div>
      <div className="overflow-hidden rounded-[30px]  rounded-tl-none">
        <div
          className="bg-[rgba(255,255,255,0.1)] min-h-[532px]  max-h-[10032px] overflow-y-auto trans-scroll-bar backdrop-blur-[20px] px-6 py-[50px] rounded-[30px] rounded-tl-none "
          style={{
            borderImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)',
          }}
        >
          {(servers || []).map((server: IServer, index: number) => (
            <Link
              href={`/service/serverfi/${params.token}/node/${server.server_id}`}
              className="flex justify-between h-[100px] pl-[10px] py-5 bg-[rgba(22,23,22,0.01)] hover:bg-[rgba(255,255,255,0.1)] cursor-pointer"
              style={{
                boxShadow: index !== (servers || []).length - 1 ? 'inset 0px -1px 0px 0px rgba(255, 255, 255, 0.1)' : 'none',
              }}
              key={server.server_id}
            >
              <div className="flex items-center text-[rgba(255,255,255,0.6)] text-[30px] leading-[44px] w-[30px] mr-[10px] font-din font-medium">{index + 1}</div>
              <div className="flex items-center w-[100px] mr-[10px]">
                <ImageWithDefaultOnError className="rounded-lg w-[60px] h-[60px]" src={server.server_logo || '/images/server-placeholder.png'} width={60} height={60} alt="logo" />
                <div className="w-4 gap-y-2 ml-1 h-full flex flex-col justify-start items-center">
                  {server.album_list.slice(0, 3).map((item: any) => (
                    <ImageWithDefaultOnError className="h-4 w-4 rounded-sm" key={item} src={item} width={16} height={16} alt="album" />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-start justify-between w-[260px] pl-[10px] mr-6 gap-y-1">
                <div className="text-white text-[22px] leading-[32px] text-nowrap flex items-center gap-x-2">
                  <TruncatedText text={server.server_name} maxLength={16} />
                  {server?.verified === '2' && <Image src="/icons/tick.svg" width={16} height={16} alt="" />}
                </div>
                <div className="text-base leading-6 flex items-center gap-x-2">
                  <span className="font-hel text-[rgba(255,255,255,0.6)]">{T('OwnedBy')}</span>
                  <span className="font-din text-white font-medium">
                    <TruncatedText text={server.owner_name} maxLength={10} />
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-between w-[120px] mr-6">
                <div className="text-[14px] leading-5 text-[rgba(255,255,255,0.6)]">{T('Members')}</div>
                <div className="font-din font-medium text-white text-[22px] leading-6 text-nowrap">{server.members}</div>
              </div>
              <div className="flex flex-col justify-between w-[160px] mr-6">
                <div className="text-[14px] leading-5 text-[rgba(255,255,255,0.6)]">{T('MAKPower')}</div>
                <div className="font-din font-medium text-white text-[22px] leading-6 text-nowrap">{formatNum(server.total_power)}</div>
              </div>
              <div className="flex flex-col justify-between w-[140px] mr-6">
                <div className="text-[14px] leading-5 text-[rgba(255,255,255,0.6)]">{T('TotalAirdrop')}</div>
                <div className="font-din font-medium text-white text-[22px] leading-6 text-nowrap">${formatNum(server.total_airdrop)}</div>
              </div>
              <div className="flex flex-col justify-between w-[100px] mr-6">
                <div className="text-[14px] leading-5 text-[rgba(255,255,255,0.6)]">{T('Airdrop')}</div>
                <div className="flex items-center justify-between">
                  <div className="font-din font-medium text-white text-[22px] leading-6 text-nowrap">{toPercent(Number(server.airdrop_percent))}%</div>
                  {server.is_up ? <Image src="/icons/up.svg" width={24} height={24} alt="" /> : <Image src="/icons/down.svg" width={24} height={24} alt="" />}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
