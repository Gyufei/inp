'use client';

import { useState } from 'react';
import UploadImage from "@/components/uploadImage"
import UploadImageList from "@/components/uploadImageList"

export default  function RegisterForm() {
  const [serverName, setServerName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');
  const [serverImage, setServerImage] = useState<File | null>(null);
  const handleImageUpload = (file: File) => {
    console.log("🚀 ~ handleImageUpload ~ file:", file)
    setServerImage(file);

  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!serverImage) {
      alert('Please upload a server image');
      return;
    }

    const formData = new FormData();
    formData.append('serverName', serverName);
    formData.append('ownerName', ownerName);
    formData.append('registrationCode', registrationCode);
    formData.append('serverImage', serverImage);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        // Handle successful registration (e.g., redirect or show success message)
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        // Handle registration error (e.g., show error message)
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle network or other errors
    }
  }
  return (
    // <>
     
    //   <UploadImageList />
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
      </div>
      <div className="p-6 pt-0 grid gap-4">
        <div className="grid gap-2">
          <label className="opacity-60 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="serverName">Server Name</label>
          <input 
            id="serverName"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            style={{backgroundColor: 'rgba(16, 20, 24, 0.1)'}}
            type="text" 
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
            required 
          />
        </div>
        <div className="grid gap-2">
          <label className="opacity-60 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="ownerName">Owner Name</label>
          <input 
            id="ownerName"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            style={{backgroundColor: 'rgba(16, 20, 24, 0.1)'}}
            type="text" 
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
            required 
          />
        </div>
        <div className="grid gap-2">
          <label className="opacity-60 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="registrationCode">Registration Code</label>
          <input 
            id="registrationCode"
            value={registrationCode}
            onChange={(e) => setRegistrationCode(e.target.value)}
            style={{backgroundColor: 'rgba(16, 20, 24, 0.1)'}}
            type="text" 
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
          />
        </div>
      </div>
      <div className="flex items-center p-6 pt-0">
        <button 
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium  transition-colors focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary h-10 px-4 py-2 w-full"
          style={{backgroundColor: '#3E71FF'}}
          >Register</button>
      </div>
    </form>
  )
}
