import React, { useState, ChangeEvent, useContext } from 'react';
import Image from 'next/image';
import { GlobalMsgContext } from '@/app/global-msg-context';
import { FileUploaderProps, FileObjectType } from './interface';
import { useTranslations } from 'next-intl';

const ImageUploader = ({ onFileAdded, onFileRemoved, uploadIcon, deleteIcon, style, hideImg = false }: FileUploaderProps): JSX.Element => {
  const T = useTranslations();
  const { setGlobalMessage } = useContext(GlobalMsgContext);

  const [currentImg, setCurrentImg] = useState<Partial<FileObjectType>>({
    file: {} as File,
    dataUrl: '',
  });

  const handleFilePicker = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target;

    if (files != null && files.length > 0) {
      if (files[0].size > 3145728) {
        setGlobalMessage({
          type: 'error',
          message: T('ImgTooLarge'),
        });
        return;
      }
      const imageObject = {
        file: files[0],
        dataUrl: URL.createObjectURL(files[0]),
      };
      setCurrentImg((oldImage) => {
        return { ...oldImage, ...imageObject };
      });
      if (onFileAdded) {
        onFileAdded(files[0]);
      }
    }
  };

  const handleDeleteImage = (): void => {
    if (onFileRemoved != null && Object.keys(currentImg).length > 0) {
      const partialCurrentImg: Partial<FileObjectType> = currentImg;
      const _currentImg: FileObjectType = partialCurrentImg as FileObjectType;
      onFileRemoved(_currentImg.file);
    }
    setCurrentImg({});
  };
  return (
    <div className="w-fit">
      <div className="relative bg-white overflow-hidden" style={style}>
        {deleteIcon !== null && (
          <div className="flex items-center justify-center absolute top-1 right-0 p-0 z-10">
            <div className="bg-transparent border-none cursor-pointer" onClick={() => handleDeleteImage()}>
              {deleteIcon}
            </div>
          </div>
        )}

        {currentImg && currentImg.dataUrl !== null && (
          <label id="file_uploader" className="absolute top-1/2 left-1/2 z-[1] -translate-y-[50%] -translate-x-[50%] w-full hover:cursor-pointer">
            <div className={currentImg.dataUrl && !hideImg ? 'opacity-0' : 'opacity-100'}>{uploadIcon && uploadIcon}</div>
            <input className="absolute h-[0.1px] w-[0.1px] opacity-0 inset-0 -z-10" key={currentImg.dataUrl} type="file" name="upload" onChange={(e) => handleFilePicker(e)} accept="image/*" id="file_uploader" />
          </label>
        )}
        {currentImg.dataUrl && !hideImg && (
          <Image
            className="block object-cover absolute w-full h-full border border-[#ffffff80] rounded-[20px] hover:border-[#3E71FF]"
            width={200}
            height={200}
            src={currentImg.dataUrl}
            alt={currentImg.dataUrl}
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
export type { FileUploaderProps, FileObjectType };
