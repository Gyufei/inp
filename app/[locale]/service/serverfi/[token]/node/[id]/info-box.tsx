
import Image from 'next/image';
import UploadImageList from '@/components/uploadImageList';
import { IServer } from '@/lib/api/use-servers';
import { useTranslations } from 'next-intl';
import { albumUpload } from '@/lib/api/album-upload';
import { useQueryClient } from '@tanstack/react-query';
export function InfoBox({ server }: { server: IServer | null }) {
  const T = useTranslations('Common');
  const queryClient = useQueryClient();
    const handleChangeImage = async (albumList: string[]) => {
    console.log("🚀 ~ handleChangeImage ~ handleChangeImage:")
    if (!server) return;
    // 处理添加，删除逻辑
    const res = await albumUpload({
      server_id: server?.server_id,
      album_list: albumList,
    });

    if (!res) {
      console.log("🚀 ~ handleChangeImage ~ res:", res)
    } else {
      console.log("🚀 ~ handleChangeImage ~ res:", res)
      // TODO: 重启请求list接口
      queryClient.invalidateQueries({ queryKey: ['servers'] });
    }
  };

  return (
    <div className="w-[300px] ml-[8px]">
      <div
          className="w-[146px] h-[68px] bg-no-repeat flex items-center justify-center pl-6 text-2xl leading-9 text-white font-cal"
          style={{
            backgroundImage: "url('/images/1097.png')",
            backgroundSize: 'cover',
            float: 'right'
          }}
        >
          {T('Info')}
      </div>
      <div className="bg-[rgba(255,255,255,0.1)] h-[292px] w-[300px] overflow-hidden overflow-y-auto trans-scroll-bar backdrop-blur-[20px] px-6 py-[50px] rounded-[30px] rounded-tr-none">
        <div className="absolute">
          <div className="flex flex-col gap-y-[10px] mb-[20px]">
            <div className="font-cal text-[#707274] text-[16px] leading-[24px]">{T('ServerName')}</div>
            <div className="font-medium text-[16px] leading-[16px] font-din text-white">{server ? server.server_name : '--'}</div>
          </div>
          <div className="flex flex-col gap-y-[10px] mb-[20px]">
            <div className="font-cal text-[#707274] text-[16px] leading-[24px]">{T('OwnerName')}</div>
            <div className="font-medium text-[16px] leading-[16px] font-din text-white">{server ? server.owner_name : '--'}</div>
          </div>
          <div className="flex flex-col gap-y-[10px]">
            <div className="font-cal text-[#707274] text-[16px] leading-[24px]">{T('Members')}</div>
            <div className="font-medium text-[16px] leading-[16px] font-din text-white">{server ? server.members : '--'}</div>
          </div>
        </div>
        <div className="absolute -z-10 top-[24px] -right-[35px]">
          <Image className="" src="/images/server.png" width={231} height={231} alt="" />
        </div>
      </div>
      <div className="mt-[8px] flex gap-x-[10px] overflow-x-auto">
        <UploadImageList 
          style={{
            height: '66px',
            width: '66px',
          }}
          initImages={server ? server.album_list : []}
          onChangeImage={handleChangeImage}
        />
      </div>
    </div>
  );
}
