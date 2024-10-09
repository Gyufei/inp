import { useMemo } from 'react';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import UploadImage from '@/components/upload-image';

import UploadImageList from '@/components/upload-image-list';
import { IServer } from '@/lib/api/use-servers';
import { useTranslations } from 'next-intl';
import { albumUpload } from '@/lib/api/album-upload';
import { logoUpdate } from '@/lib/api/logo-update';
import { delAction } from '@/lib/api/upload-action';
import { ImageWithDefaultOnError } from '@/components/image-with-onError';

export function InfoBox({ server, setServers }: { server: IServer | null; setServers: () => void }) {
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

  const handleLogoImageUpdate = async (imgUrl: string) => {
    if (!server) return;
    const res = await logoUpdate({
      server_id: server?.server_id,
      server_logo: imgUrl,
    });

    if (res) {
      const keyFilename = server?.server_logo.split('/').pop() || '';
      await delAction({ keyFilename });
      queryClient.invalidateQueries({ queryKey: ['server'] });
      setServers();
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-x-[20px] relative ">
        {allowUploadImg ? (
          <UploadImage
            onImageUpload={handleLogoImageUpdate}
            style={{ height: '66px', width: '66px', border: 'none' }}
            uploadIcon={
              <ImageWithDefaultOnError className="size-[66px] border border-[#ffffff80] rounded-[20px] hover:border-[#3E71FF]" src={server?.server_logo || '/images/server.png'} width={66} height={66} alt="" priority />
            }
          />
        ) : (
          <ImageWithDefaultOnError className="size-[66px] border border-[#ffffff80] rounded-[20px]" src={server?.server_logo || '/images/server.png'} width={66} height={66} alt="" priority />
        )}

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
