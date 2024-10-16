'use client';
import { useEffect, useContext } from 'react';
import { Link } from '@/app/navigation';
import { useServers } from '@/lib/api/use-servers';
import LanguageSetting from '@/components/language-setting';
import ConnectBtn from '@/components/connect-btn';
import AirdropBtn from '@/components/airdrop-btn';
import { AirdropTime } from '@/components/airdrop-time';
import { useTranslations } from 'next-intl';
import { NodeInfoRow } from './node-info-row';
import { DepositBtn } from './deposit-btn';
import { WithdrawBtn } from './withdraw-btn';
import { ProfitBtn } from './profit-btn';
import { InfoBox } from './info-box';
import { NodeMembers } from './node-members';
import { RegisterBtn } from './register-btn';
import { NodeActivities } from './node-activities';
import { GlobalMsgContext } from '@/app/global-msg-context';

export default function Page({ params: { id } }: { params: { id: string } }) {
  const T = useTranslations('Common');
  const { setGlobalMessage } = useContext(GlobalMsgContext);
  const { data: servers, refetch: setServers } = useServers();
  const currentServer = (servers || [])?.find((server) => server.server_id === Number(id));
  const rank = servers ? servers.findIndex((server) => server.server_id === Number(id)) + 1 : null;

  useEffect(() => {
    const fetchServers = async () => {
      setGlobalMessage({
        type: 'loading',
        message: ' Fetching server data... ',
      });
      const { data } = await setServers();
      const currentData = (data || [])?.find((server) => server.server_id === Number(id));
      if (currentData) {
        clearInterval(interval);
        setGlobalMessage(null);
      }
    };

    fetchServers();
    const interval = setInterval(fetchServers, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="relative">
        <div className="z-10 relative">
          <div className="flex items-start justify-between">
            <AirdropTime />
            <div className="flex items-center gap-x-5">
              <AirdropBtn />
              <LanguageSetting />
              <ConnectBtn />
            </div>
          </div>

          <div className="flex flex-col items-start mt-[76px]">
            <Link href="/service/serverfi/mak/nodes" className="text-[20px] text-[#3E71FF] font-400">
              &lt; {T('AllNodes')}
            </Link>
            <div className="font-cal text-[40px] font-bold leading-[80px] text-white">{T('NodeBannerTitle')}</div>
            <div className="font-cal text-white font-bold">
              <span className="text-[50px]">No. </span>
              <span className="text-[100px]">{id}</span>
            </div>
          </div>

          <NodeInfoRow server={currentServer || null} rank={rank} />
        </div>

        <video className="absolute -top-[265px] -right-[100px] z-0 w-[1920px] h-[1080px]" src="/1-1.mp4" muted loop autoPlay playsInline />
      </div>

      <div className="mt-10 flex items-center gap-x-1 relative">
        <DepositBtn serverId={Number(id)} />
        <WithdrawBtn serverId={Number(id)} />
        <ProfitBtn serverId={Number(id)} />
        <RegisterBtn serverId={Number(id)} />
      </div>
      <div className="mt-16 flex">
        <InfoBox server={currentServer || null} setServers={setServers} />
      </div>

      <div className="mt-16 flex">
        <NodeActivities serverId={Number(id)} />
        <NodeMembers serverId={Number(id)} />
      </div>
    </div>
  );
}
