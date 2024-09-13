'use client';

import React, { useState } from 'react';
import UploadImage from './uploadImage';
import ImageItem from './imageItem';

interface UploadedImage {
  id: string;
  url: string;
}

const UploadImageList: React.FC = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  console.log("🚀 ~ images:", images)

  const handleImageUpload = async (file: File) => {
    try {
      // 这里应该是实际的文件上传逻辑
      // 以下是模拟上传过程
      // const formData = new FormData();
      // formData.append('file', file);
      setIsUploading(true)
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsUploading(false)

      // 假设服务器返回了图片URL
      // const imageUrl = URL.createObjectURL(file);

      const newImage: UploadedImage = {
        id: Date.now().toString(),
        url: file.dataUrl,
      };

      setImages(prevImages => [...prevImages, newImage]);
    } catch (error) {
      console.error('Error uploading image:', error);
      // 这里可以添加错误处理逻辑，比如显示错误消息
    }
  };

  const handleImageDelete = (id: string) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {images.map((image) => (
        <ImageItem
          key={image.id}
          image={image}
          onDelete={() => handleImageDelete(image.id)}
        />
      ))}
      <UploadImage onImageUpload={handleImageUpload} hideImg={!isUploading}/>
    </div>
  );
};

export default UploadImageList;