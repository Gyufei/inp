'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import UploadImage from './upload-image';
import ImageItem from './image-item';
import { delAction } from '@/lib/api/upload-action';
import { useTranslations } from 'next-intl';

const UploadImageList = ({ style, initImages, onChangeImage, hideAdd = false }: { style: any; initImages?: string[] | null; onChangeImage?: (images: string[]) => void; hideAdd: boolean }) => {
  const T = useTranslations('Common');

  const [images, setImages] = useState<string[]>(initImages || []);
  const [isUploading] = useState(false);

  const handleImageUpload = async (newImage: string) => {
    const newImages = [...images, newImage];
    setImages(newImages);
    onChangeImage?.(newImages);
  };

  const handleImageDelete = async (newImage: string) => {
    const keyFilename = newImage.split('/').pop() || '';
    const response = await delAction({ keyFilename });
    if (!response) {
      return;
    }

    const newImages = images.filter((img) => img !== newImage);
    setImages(newImages);
    onChangeImage?.(newImages);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {images.map((image, index) => (
        <ImageItem key={index} image={image} onDelete={() => handleImageDelete(image)} style={style} hideDel={hideAdd} />
      ))}
      {!hideAdd && (
        <UploadImage
          onImageUpload={handleImageUpload}
          hideImg={!isUploading}
          style={style}
          uploadIcon={
            <div className="size-[66px] flex flex-col items-center justify-center bg-[rgba(255,255,255,0.1)] rounded-[12px] border border-[rgba(255,255,255,0.2)]">
              <Image src="/icons/pic.svg" width={26} height={26} alt="" />
              <p className="text-[12px] font-inter text-[#FFFFFF] opacity-40 mt-[4px]">{T('Add')}</p>
            </div>
          }
        />
      )}
    </div>
  );
};

export default UploadImageList;
