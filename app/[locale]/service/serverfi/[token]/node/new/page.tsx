'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/app/navigation';
import UploadImage from '@/components/upload-image';
import { useRegister } from '@/lib/hook/use-register';
import { toHex } from '@/lib/utils';
import useServerName from '@/lib/hook/use-server-name';
import useOwnerName from '@/lib/hook/use-owner-name';

export default function RegisterForm() {
  const T = useTranslations('Common');
  const router = useRouter();
  const searchParams = useSearchParams();

  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const { isLoading: isRegisterLoading, write: registerAction, isSuccess: isRegisterSuccess } = useRegister();

  const {
    serverName,
    invalidMsg: serverInvalidMsg,
    handleChange: handleServerChange,
    handleValidate: handleServerValidate,
  } = useServerName();

  const { ownerName, invalidMsg: ownerInvalidMsg, handleChange: handleOwnerChange, handleValidate: handleOwnerValidate } = useOwnerName();

  const [serverNo, setServerNo] = useState('');
  const [serverImage, setServerImage] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get('ref')) {
      setServerNo(searchParams.get('ref') as string);
    }
  }, [searchParams]);

  const handleImageUpload = async (imgUrl: string) => {
    setServerImage(imgUrl);
  };

  async function handleSubmit() {
    if (!address) {
      open();
      return;
    }

    const serverNameValid = await handleServerValidate(serverName);
    const ownerNameValid = await handleOwnerValidate(ownerName);

    if (!serverNameValid || !ownerNameValid) {
      return;
    }

    if (!serverName || !ownerName) {
      return;
    }

    const name = toHex(serverName);
    const owner = toHex(ownerName);
    const image = serverImage ? toHex(serverImage as string) : '';
    const no = serverNo;

    registerAction?.({
      serverName: name,
      ownerName: owner,
      serverNo: no,
      serverLogo: image,
    });
  }

  useEffect(() => {
    if (isRegisterSuccess) {
      router.push('/service/serverfi/mak/nodes');
    }
  }, [isRegisterSuccess, router]);

  return (
    <div className="relative overflow-hidden h-[657px]">
      <video className="absolute -top-[220px] -right-[195px] z-0 w-[1920px] h-[1080px]" src="/1-1.mp4" muted loop autoPlay playsInline />
      <div className="absolute right-[60px] flex items-center">
        <div className="flex flex-col w-[446px] mb-10">
          <h3 className="font-semibold text-[50px] text-white mb-4 text-center font-cal">{T('RegisterYourServer')}</h3>
          <div
            className="rounded-lg shadow-sm text-white"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col p-6">
              <div className="flex items-center justify-center mt-4">
                <UploadImage onImageUpload={handleImageUpload} />
              </div>
            </div>
            <div className="p-6 pt-0 grid gap-6">
              <div className="grid gap-2 relative">
                <label
                  className="opacity-60 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="serverName"
                >
                  {T('ServerName')}
                </label>
                <input
                  data-error={!!serverInvalidMsg}
                  name="serverName"
                  type="text"
                  className="bg-[rgba(16,20,24,0.1)] flex h-10 w-full rounded-md border border-gray-700 px-3 py-2 text-sm data-[error=true]:border-[#E86565]"
                  required
                  value={serverName}
                  onChange={(e) => handleServerChange(e.target.value)}
                />
                <div className="absolute w-full top-full text-[#E86565] text-sm leading-5">{serverInvalidMsg}</div>
              </div>
              <div className="grid gap-2 relative">
                <label
                  className="opacity-60 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="ownerName"
                >
                  {T('OwnerName')}
                </label>
                <input
                  data-error={!!ownerInvalidMsg}
                  name="ownerName"
                  type="text"
                  className="bg-[rgba(16,20,24,0.1)] flex h-10 w-full rounded-md border border-gray-700 px-3 py-2 text-sm data-[error=true]:border-[#E86565]"
                  required
                  value={ownerName}
                  onChange={(e) => handleOwnerChange(e.target.value)}
                />
                <div className="absolute w-full top-full text-[#E86565] text-sm leading-5">{ownerInvalidMsg}</div>
              </div>
              <div className="grid gap-2">
                <label
                  className="opacity-60 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="registrationCode"
                >
                  {T('RegistrationUnder')}
                </label>
                <input
                  name="serverNo"
                  type="text"
                  className="bg-[rgba(16,20,24,0.1)] flex h-10 w-full rounded-md border border-gray-700 px-3 py-2 text-sm !disabled:bg-[(16,20,24,0.1)] disabled:cursor-not-allowed"
                  disabled={true}
                  value={serverNo}
                />
              </div>
            </div>
            <div className="flex items-center p-6 pt-0">
              <button
                onClick={handleSubmit}
                disabled={isRegisterLoading}
                className="font-cal bg-[#3E71FF] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium  transition-colors disabled:pointer-events-none disabled:opacity-50 bg-primary h-10 px-4 py-2 w-full"
              >
                {T('Register')}
              </button>
            </div>
          </div>
        </div>
        <Image className="mt-[56%] ml-[100px]" src="/images/metacene.png" width={303} height={35} alt="" />
      </div>
    </div>
  );
}
