import Image from 'next/image';
import { useState } from 'react';
import ImageUploader from './reactImageUploader';
import { uploadAction } from '@/lib/api/upload-action';
import { R2_URl_HOST } from '@/lib/const';
import { isProduction } from '@/lib/PathMap';

const UploadImageList = ({onImageUpload, hideImg = false, style = {}}: {
    onImageUpload: (url: string) => void,
    hideImg?: boolean,
    style?: React.CSSProperties
}) => {
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileAdded(imageFile: File) {
    setIsUploading(true)
    try {
      const response = await uploadAction({ filename: imageFile.name });
      if (!response) {
        return;
      }
      const { url, nameKey } = await response.json();

      // 2. 使用上传URL上传文件
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': imageFile.type,
        },
        body: imageFile,
      });
      console.log('Image uploaded successfully!');
      setIsUploading(false)
      onImageUpload(`${R2_URl_HOST}/${isProduction ? 'production' : 'test'}/${nameKey}`);
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsUploading(false)
    }
  }

  function runAfterImageDelete(file: File) {
    console.log({ file });
  }

  return (
    <ImageUploader
      onFileAdded={(img) => handleFileAdded(img as any)}
      onFileRemoved={(img) => runAfterImageDelete(img as any)}
      uploadIcon={<Image src="/icons/add.svg" width={140} height={140} alt="" />}
      deleteIcon={null}
      style={{
        height: '140px',
        width: '140px',
        color: '#ffb200',
        backgroundColor: '#1014181a',
        filter: isUploading ? 'blur(2px)' : 'none',
        ...style,

      }}
      hideImg={isUploading ? false : hideImg}
    />
  );
};

export default UploadImageList;
