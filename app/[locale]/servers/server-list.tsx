'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { IServer } from '@/lib/type';
import { useServers } from '@/lib/api/use-servers';

export function ServerList() {
  const T = useTranslations('Common');

  const { data: servers } = useServers();

  return (
    <div className="mt-10">
      <div className="w-[257px] h-[68px] flex items-center pl-6 text-2xl leading-9 text-white">{T('ServerNodes')}</div>
      <div className="bg-[rgba(255,255,255,0.1)] h-[732px] rounded-[30px] backdrop-blur-[20px] px-6 py-4 border border-solid border-[rgba(255,255,255,0.2)] rounded-tl-none ">
        {(servers || []).map((server: IServer, index: number) => (
          <div
            className="flex justify-between h-[100px] pl-[10px] py-5 bg-[rgba(22,23,22,0.01)]"
            style={{
              boxShadow: index !== (servers || []).length - 1 ? 'inset 0px -1px 0px 0px rgba(255, 255, 255, 0.1)' : 'none',
            }}
            key={server.server_id}
          >
            <div className="flex items-center text-[rgba(255,255,255,0.6)] text-[20px] leading-[30px] w-[40px] mr-[10px]">{index}</div>
            <div className="flex items-center w-[140px] mr-[50px]">
              {/* <Image src={server.server_logo} width={60} height={60} alt="" />
              <div className="w-4 flex flex-col justify-between items-center">
                {server.album_list.map((item: any) => (
                  <Image key={item} src={item} width={16} height={16} alt="" />
                ))}
              </div> */}
            </div>
            <div className="flex flex-col items-start justify-between w-[140px] pl-[10px] mr-6">
              <div className="text-base leading-6 text-[rgba(255,255,255,0.6)]">{T('ServerName')}</div>
              <div className="text-white text-base leading-6 text-nowrap">{server.server_name}</div>
            </div>
            <div className="flex flex-col justify-between w-[140px] mr-6">
              <div className="text-base leading-6 text-[rgba(255,255,255,0.6)]">{T('Owner')}</div>
              <div className="text-white text-base leading-6 text-nowrap">{server.owner_name}</div>
            </div>
            <div className="flex flex-col justify-between w-[140px] mr-6">
              <div className="text-base leading-6 text-[rgba(255,255,255,0.6)]">{T('Members')}</div>
              <div className="text-white text-base leading-6 text-nowrap">{server.members}</div>
            </div>
            <div className="flex flex-col justify-between w-[140px] mr-6">
              <div className="text-base leading-6 text-[rgba(255,255,255,0.6)]">{T('MAKPower')}</div>
              <div className="text-white text-base leading-6 text-nowrap">{server.mak_power}</div>
            </div>
            <div className="flex flex-col justify-between w-[140px] mr-6">
              <div className="text-base leading-6 text-[rgba(255,255,255,0.6)]">{T('TotalAirdrop')}</div>
              <div className="text-white text-base leading-6 text-nowrap">${server.total_airdrop}</div>
            </div>
            <div className="flex flex-col justify-between w-[140px] mr-6">
              <div className="text-base leading-6 text-[rgba(255,255,255,0.6)]">{T('Airdrop')}</div>
              <div className="flex items-center justify-between">
                <div className="text-white text-base leading-6 text-nowrap">{server.airdrop_percent}%</div>
                {server.is_up ? (
                  <Image src="/icons/up.svg" width={24} height={24} alt="" />
                ) : (
                  <Image src="/icons/down.svg" width={24} height={24} alt="" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
