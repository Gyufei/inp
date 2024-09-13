import { AirdropTime } from './airdrop-time';
import { ServerList } from './server-list';

export default function Page() {
  return (
    <div className="w-full pb-10">
      <AirdropTime />
      <ServerList />
    </div>
  );
}
