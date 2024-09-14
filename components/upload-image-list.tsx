'use client';

import React, { useState } from 'react';
import UploadImage from './upload-image';
import ImageItem from './image-item';
import { delAction } from '@/lib/api/upload-action';


const UploadImageList = ({
  style, 
  initImages,
  onChangeImage,
  hideAdd = false
}: {
  style: any, 
  initImages?: string[] | null,
  onChangeImage?: (images: string[]) => void,
  hideAdd: boolean
}) => {
  const [images, setImages] = useState<string[]>(initImages || []);
  const [isUploading] = useState(false);

  const handleImageUpload = async (newImage: string) => {
    const newImages = [...images, newImage]
    setImages(newImages);
    onChangeImage?.(newImages)
  };

  const handleImageDelete = async (newImage: string) => {
      const keyFilename = newImage.split('/').pop() || '';
      const response = await delAction({ keyFilename });
      if (!response) {
        return;
      }
   
    const newImages = images.filter((img) => img !== newImage);
    setImages(newImages);
    onChangeImage?.(newImages)

  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {images.map((image, index) => (
          <ImageItem key={index} image={image} onDelete={() => handleImageDelete(image)} style={style} />
        ))}
      {hideAdd && <UploadImage onImageUpload={handleImageUpload} hideImg={!isUploading} style={style}/>}
    </div>
  );
};

export default UploadImageList;
