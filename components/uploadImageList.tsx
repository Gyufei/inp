'use client';

import React, { useState } from 'react';
import UploadImage from './uploadImage';
import ImageItem from './imageItem';

const UploadImageList = ({style}: {style: any}) => {
  console.log("🚀 ~ UploadImageList ~ style:", style)
  const [images, setImages] = useState<string[]>([]);
  const [isUploading] = useState(false);
  console.log('🚀 ~ images:', images);

  const handleImageUpload = async (newImage: string) => {
    setImages((prevImages) => [...prevImages, newImage]);
  };

  const handleImageDelete = (_newImage: string) => {
    // setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {images.map((image, index) => (
        <ImageItem key={index} image={image} onDelete={() => handleImageDelete(image)} />
      ))}
      <UploadImage onImageUpload={handleImageUpload} hideImg={!isUploading} style={style}/>
    </div>
  );
};

export default UploadImageList;
