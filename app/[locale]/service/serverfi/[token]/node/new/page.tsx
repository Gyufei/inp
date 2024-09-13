'use client';

import { useState } from 'react';
import Image from 'next/image';
import UploadImage from '@/components/uploadImage';

export default function RegisterForm() {
  const [serverImage, setServerImage] = useState<string | null>(null);
  const handleImageUpload = async (imgUrl: string) => {
    console.log('🚀 ~ handleImageUpload ~ imgUrl:', imgUrl);
    setServerImage(imgUrl);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const serverName = formData.get('serverName');
    const ownerName = formData.get('ownerName');
    const serverNo = formData.get('serverNo');
    console.log('🚀 ~ handleSubmit ~ handleSubmit:', serverName, ownerName, serverNo, serverImage);
    //TODO: 数据提交
  };
  return (
    <div className="relative overflow-hidden" style={{ height: 'calc(100vh - 70px)' }}>
      <video className="absolute -top-[220px] -right-[195px] z-0 w-[1920px] h-[1080px]" src="/1-1.mp4" muted loop autoPlay playsInline />
      <div className="absolute right-[60px] flex items-center">
        <div className="flex flex-col w-[446px] mb-10">
          <h3 className="font-semibold text-[50px] text-white mb-4 text-center font-cal">Register Your Server</h3>
          <form
            onSubmit={handleSubmit}
            className="rounded-lg shadow-sm text-white"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col p-6">
              <div className="flex items-center justify-center mt-4">
                <UploadImage onImageUpload={handleImageUpload} />
              </div>
              {/* <UploadImageList /> */}
            </div>
            <div className="p-6 pt-0 grid gap-4">
              <div className="grid gap-2">
                <label
                  className="opacity-60 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="serverName"
                >
                  Server Name
                </label>
                <input
                  name="serverName"
                  type="text"
                  className="bg-[rgba(16, 20, 24, 0.1)] flex h-10 w-full rounded-md border border-gray-700 px-3 py-2 text-sm focus-visible:ring-2  "
                  required
                />
              </div>
              <div className="grid gap-2">
                <label
                  className="opacity-60 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="ownerName"
                >
                  Owner Name
                </label>
                <input
                  name="ownerName"
                  type="text"
                  className="bg-[rgba(16, 20, 24, 0.1)] flex h-10 w-full rounded-md border border-gray-700 px-3 py-2 text-sm file:border-0 focus-visible:ring-2 "
                  required
                />
              </div>
              <div className="grid gap-2">
                <label
                  className="opacity-60 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="registrationCode"
                >
                  Registration Under Server No.
                </label>
                <input
                  name="serverNo"
                  type="text"
                  className="bg-[rgba(16, 20, 24, 0.1)] flex h-10 w-full rounded-md border border-gray-700 px-3 py-2 text-sm focus-visible:ring-2 "
                />
              </div>
            </div>
            <div className="flex items-center p-6 pt-0">
              <button className="font-cal bg-[#3E71FF] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium  transition-colors focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary h-10 px-4 py-2 w-full">
                Register
              </button>
            </div>
          </form>
        </div>
        <Image className="mt-[56%] ml-[100px]" src="/images/metacene.png" width={303} height={35} alt="" />
      </div>
    </div>
  );
}
