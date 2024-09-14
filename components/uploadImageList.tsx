'use client';

import React, { useState } from 'react';
import UploadImage from './uploadImage';
import ImageItem from './imageItem';
// import { delAction } from '@/lib/api/upload-action';


const UploadImageList = ({style, initImages}: {style: any, initImages?: string[] | null}) => {
  const [images, setImages] = useState<string[]>(initImages || []);
  const [isUploading] = useState(false);

  const handleImageUpload = async (newImage: string) => {
    setImages((prevImages) => [...prevImages, newImage]);
  };

  const handleImageDelete = async (newImage: string) => {
    // try {
    //   const keyFilename = newImage.split('/').pop() || '';
    //   const response = await delAction({ keyFilename });
    //   if (!response) {
    //     return;
    //   }
    //   const { url } = await response.json();

    //   // 2. 使用上传URL上传文件
    //   await fetch(url, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': file.type,
    //     },
    //     body: file,
    //   });
    //   console.log('Image uploaded successfully!');
    //   onImageUpload(`${IMG_URl_HOST}/test/${nameKey}`);
    // } catch (error) {
    //   console.error('Error uploading image:', error);
    // }
    // setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {images.map((image, index) => (
        <ImageItem key={index} image={image} onDelete={() => handleImageDelete(image)} style={style} />
      ))}
      <UploadImage onImageUpload={handleImageUpload} hideImg={!isUploading} style={style}/>
    </div>
  );
};

export default UploadImageList;
