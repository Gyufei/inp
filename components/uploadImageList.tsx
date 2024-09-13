'use client';

import React, { useState } from 'react';
import UploadImage from './uploadImage';
import ImageItem from './imageItem';

interface UploadedImage {
  id: string;
  url: string;
}

const UploadImageList: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  console.log("🚀 ~ images:", images)

  const handleImageUpload = async (newImage: string) => {
      setImages(prevImages => [...prevImages, newImage]);
  };

  const handleImageDelete = (id: string) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {images.map((image, index) => (
        <ImageItem
          key={index}
          image={image}
          onDelete={() => handleImageDelete(image)}
        />
      ))}
      <UploadImage onImageUpload={handleImageUpload} hideImg={!isUploading}/>
    </div>
  );
};

export default UploadImageList;