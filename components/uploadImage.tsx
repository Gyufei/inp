import Image from 'next/image';
import ImageUploader from './reactImageUploader';
import { uploadAction } from '@/lib/api/upload-action';
import { R2_URl_HOST } from '@/lib/const';

const UploadImageList = ({onImageUpload, hideImg = false, style = {}}: {
    onImageUpload: (url: string) => void,
    hideImg?: boolean,
    style?: React.CSSProperties
}) => {
  async function handleFileAdded(imageFile: File) {
  
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
      onImageUpload(`${R2_URl_HOST}/test/${nameKey}`);
    } catch (error) {
      console.error('Error uploading image:', error);
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
        ...style,

      }}
      hideImg={hideImg}
    />
  );
};

export default UploadImageList;
