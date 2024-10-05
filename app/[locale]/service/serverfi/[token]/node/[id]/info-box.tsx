import { useMemo } from 'react';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';

import UploadImageList from '@/components/upload-image-list';
import { IServer } from '@/lib/api/use-servers';
import { useTranslations } from 'next-intl';
import { albumUpload } from '@/lib/api/album-upload';
import { ImageWithDefaultOnError } from '@/components/image-with-onError';

export function InfoBox({ server }: { server: IServer | null }) {
  const T = useTranslations('Common');
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const handleChangeImage = async (albumList: string[]) => {
    if (!server) return;
    const res = await albumUpload({
      server_id: server?.server_id,
      album_list: albumList,
    });
    if (res) {
      queryClient.invalidateQueries({ queryKey: ['server'] });
    }
  };

  const allowUploadImg = useMemo(() => {
    if (!server || !address) return false;
    return server.wallet.toLowerCase() === address.toLowerCase();
  }, [server, address]);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-x-[20px]">
        <ImageWithDefaultOnError className="size-[66px] rounded-[12px]" src={server?.server_logo || '/images/server.png'} width={66} height={66} alt="" priority />
        <div className="flex flex-col gap-y-[10px]">
          <div className="font-hel text-[#707274] text-[16px] leading-[24px]">{T('ServerName')}</div>
          <div className="font-inter text-[16px] leading-[16px] text-white">{server ? server.server_name : '--'}</div>
        </div>
        <div className="flex flex-col gap-y-[10px] ml-[30px]">
          <div className="font-hel text-[#707274] text-[16px] leading-[24px]">{T('OwnerName')}</div>
          <div className="font-inter text-[16px] leading-[16px] text-white">
            {server ? (
              <p className="flex items-center gap-x-[8px]">
                {server.owner_name}
                <Link href={`https://etherscan.io/address/${server.wallet}`} target="_blank">
                  <Image className="size-[20px] scale-[3] translate-y-[4px]" src="/icons/image.svg" width={20} height={20} alt="" />
                </Link>
              </p>
            ) : (
              '--'
            )}
          </div>
        </div>
      </div>
      {server && (
        <div className="mt-[8px] flex gap-x-[10px]">
          <UploadImageList
            style={{
              height: '66px',
              width: '66px',
            }}
            initImages={server.album_list}
            onChangeImage={handleChangeImage}
            hideAdd={!allowUploadImg}
          />
        </div>
      )}
    </div>
  );
}
