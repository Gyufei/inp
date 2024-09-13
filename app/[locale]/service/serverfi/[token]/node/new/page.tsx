'use client';

import { useState } from 'react';
import UploadImage from "@/components/uploadImage"
import UploadImageList from "@/components/uploadImageList"

export default  function RegisterForm() {
  const [serverImage, setServerImage] = useState<string | null>(null);
  const handleImageUpload = async (imgUrl: string) => {
    console.log("🚀 ~ handleImageUpload ~ imgUrl:", imgUrl)
    setServerImage(imgUrl)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const serverName = formData.get('serverName');
    const ownerName = formData.get('ownerName');
    const serverNo = formData.get('serverNo');
    console.log("🚀 ~ handleSubmit ~ handleSubmit:", serverName, ownerName, serverNo, serverImage)
    //TODO: 数据提交

    
  }
  return (
    // <>
     
    // </>
    <form onSubmit={handleSubmit} className="rounded-lg border shadow-sm w-full max-w-sm mx-auto text-white"
      style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(20px)'}}>
      <div className="flex flex-col p-6">
        <h3 className="font-semibold tracking-tight text-2xl">Register Your ServerFi</h3>
        <div className="flex items-center justify-center mt-4">
          <UploadImage 
            onImageUpload={handleImageUpload}
          />
        </div>
        <UploadImageList />
      </div>
      <div className="p-6 pt-0 grid gap-4">
        <div className="grid gap-2">
          <label className="opacity-60 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="serverName">Server Name</label>
          <input 
            name="serverName"
            type="text" 
            className="bg-[rgba(16, 20, 24, 0.1)] flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
            required 
          />
        </div>
        <div className="grid gap-2">
          <label className="opacity-60 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="ownerName">Owner Name</label>
          <input 
            name="ownerName"
            type="text" 
            className="bg-[rgba(16, 20, 24, 0.1)] flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
            required 
          />
        </div>
        <div className="grid gap-2">
          <label className="opacity-60 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="registrationCode">Registration Under Server No.</label>
          <input 
            name="serverNo"
            type="text" 
            className="bg-[rgba(16, 20, 24, 0.1)] flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
          />
        </div>
      </div>
      <div className="flex items-center p-6 pt-0">
        <button 
          className="bg-[#3E71FF] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium  transition-colors focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary h-10 px-4 py-2 w-full"
          >Register</button>
      </div>
    </form>
  )
}
