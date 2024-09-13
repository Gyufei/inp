import { NodesList } from './nodes-list';
import { NodesBanner } from './nodes-banner';

export default function Page() {
  return (
    <div className="w-full">
      <NodesBanner />
      <NodesList />
    </div>
  );
}
