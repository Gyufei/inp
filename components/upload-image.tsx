import Image from 'next/image';
import { useEffect, useState } from 'react';
import ImageUploader from './react-image-uploader';
import { uploadAction } from '@/lib/api/upload-action';
import { R2_URl_HOST } from '@/lib/const';
import { isProduction } from '@/lib/PathMap';

const UploadImage = ({
  onImageUpload,
  hideImg = false,
  style = {},
  scheduledUpload = false,
  isStartScheduledUpload = false,
  onScheduledUpload,
}: {
  onImageUpload: (url: string) => void;
  hideImg?: boolean;
  style?: React.CSSProperties;
  scheduledUpload?: boolean;
  isStartScheduledUpload?: boolean;
  onScheduledUpload?: () => void;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [scheduledUploadData, setScheduledUploadData] = useState<{
    imageFile: File | null;
    imageNameKey: string;
  }>({
    imageFile: null,
    imageNameKey: '',
  });

  useEffect(() => {
    if (isStartScheduledUpload && scheduledUploadData.imageNameKey) {
      fetchImage(scheduledUploadData.imageFile!, scheduledUploadData.imageNameKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStartScheduledUpload]);

  async function handleFileAdded(imageFile: File) {
    const nameKey = `${crypto.randomUUID().replace(/-/g, '')}-${imageFile.name}`;
    if (scheduledUpload) {
      setScheduledUploadData({ imageFile, imageNameKey: nameKey });
      onImageUpload(`${R2_URl_HOST}/${isProduction ? 'production' : 'test'}/${nameKey}`);
      return;
    }
    await fetchImage(imageFile, nameKey);
  }

  const fetchImage = async (imageFile: File, imageNameKey: string) => {
    setIsUploading(true);
    try {
      const response = await uploadAction(imageNameKey);
      if (!response) {
        return;
      }
      const { url } = await response.json();

      // 2. 使用上传URL上传文件
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': imageFile.type,
        },
        body: imageFile,
      });
      console.log('Image uploaded successfully!');
      setIsUploading(false);
      if (scheduledUpload) {
        onScheduledUpload?.();
        return;
      }
      onImageUpload(`${R2_URl_HOST}/${isProduction ? 'production' : 'test'}/${imageNameKey}`);
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsUploading(false);
    }
  };

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

export default UploadImage;
