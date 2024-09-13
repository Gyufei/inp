import { useTranslations } from 'next-intl';
import Image from 'next/image'
import UploadImageList from "@/components/uploadImageList"

export function InfoBox() {
  const T = useTranslations('Common');

  function handleClick() {}

  return (
    <div
    className="w-[300px]"
    >
      <div
          className="w-[146px] h-[68px] bg-no-repeat flex items-center justify-center pl-6 text-2xl leading-9 text-white font-cal"
          style={{
            backgroundImage: "url('/images/1097.png')",
            backgroundSize: 'cover',
            float: 'right'
          }}
        >
          Info
      </div>
        <div
          className="bg-[rgba(255,255,255,0.1)] h-[292px] w-[300px] overflow-y-auto trans-scroll-bar backdrop-blur-[20px] px-6 py-[50px] rounded-[30px] rounded-tr-none"
        >
        <div className="absolute">
            <div className="flex flex-col gap-y-[10px] mb-[20px]">
              <div className="font-cal text-[#707274] text-[16px] leading-[24px]">Server Name</div>
              <div className="font-medium text-[16px] leading-[16px] font-din text-white">小瓜瓜的服务器</div>
            </div>
            <div className="flex flex-col gap-y-[10px] mb-[20px]">
              <div className="font-cal text-[#707274] text-[16px] leading-[24px]">Owner Name</div>
              <div className="font-medium text-[16px] leading-[16px] font-din text-white">小瓜瓜</div>
            </div>
            <div className="flex flex-col gap-y-[10px]">
              <div className="font-cal text-[#707274] text-[16px] leading-[24px]">Members</div>
              <div className="font-medium text-[16px] leading-[16px] font-din text-white">1200</div>
            </div>
          </div>
          <div className="absolute -z-10 top-[24px] right-[10px]">
            <Image className="" src="/images/server.png" width={231} height={231} alt="" />
          </div>
      </div>
      <div className="mt-[20px] flex gap-x-[10px] overflow-x-auto">
        <Image className="w-[66px] h-[66px] rounded-[12px]" src="/images/server.png" width={231} height={231} alt="" />
        <Image className="w-[66px] h-[66px] rounded-[12px]" src="/images/server.png" width={231} height={231} alt="" />
        <Image className="w-[66px] h-[66px] rounded-[12px]" src="/images/server.png" width={231} height={231} alt="" />
        <UploadImageList 
          style={{
            height: '66px',
            width: '66px',
          }}
        />
      </div>
    </div>
  );
}
