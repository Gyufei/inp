'use client';
import { useServers } from '@/lib/api/use-servers';
import LanguageSetting from '@/components/language-setting';
import ConnectBtn from '@/components/connect-btn';
import { AirdropTime } from '@/components/airdrop-time';
import { useTranslations } from 'next-intl';
import { NodeInfoRow } from './node-info-row';
import { DepositBtn } from './deposit-btn';
import { WithdrawBtn } from './withdraw-btn';
import { ProfitBtn } from './profit-btn';

export default function Page({ params: { id } }: { params: { id: string } }) {
  const T = useTranslations('Common');
  const { data: servers } = useServers();

  const currentServer = (servers || [])?.find((server) => server.server_id === Number(id));
  const rank = servers ? servers.findIndex((server) => server.server_id === Number(id)) + 1 : null;

  return (
    // <div>
    //   <button className="bg-white text-black mr-4" onClick={handleWithdraw}>
    //     {isWdLoading ? 'Withdrawing' : isWdSuccess ? 'Withdraw Success' : 'Withdraw'}
    //   </button>
    //   <button className="bg-white text-black" onClick={handleDeposit}>
    //     {isDepositLoading ? 'Depositing' : isDepositSuccess ? 'Deposit Success' : 'Deposit'}
    //   </button>
    // </div>
    <div className="w-full">
      <div className="flex items-start justify-between">
        <AirdropTime />
        <div className="flex items-center gap-x-5">
          <LanguageSetting />
          <ConnectBtn />
        </div>
      </div>

      <div className="flex flex-col items-start mt-[76px]">
        <div className="font-cal text-[40px] font-bold leading-[80px] text-white">{T('NodeBannerTitle')}</div>
        <div className="font-cal text-white font-bold">
          <span className="text-[50px]">No.</span>
          <span className="text-[100px]">{id}</span>
        </div>
      </div>

      <NodeInfoRow server={currentServer || null} rank={rank} />

      <div className="mt-10 flex items-center gap-x-1">
        <DepositBtn serverId={Number(id)} />
        <WithdrawBtn serverId={Number(id)} />
        <ProfitBtn serverId={Number(id)} />
      </div>
    </div>
  );
}
