import Image from 'next/image';
import ImageUploader from './reactImageUploader';
import { uploadAction } from '@/lib/api/use-upload-action';
import { R2_URl_HOST } from '@/lib/const';

const UploadImageList = ({onImageUpload, hideImg = false, style = {}}: {
    onImageUpload: (url: string) => void,
    hideImg?: boolean,
    style?: any
}) => {
  console.log("🚀 ~ style:", style)
  async function getImageFileObject(imageFile: File) {
    const file = (imageFile as any).file;
    console.log({ imageFile });
    try {
      const response = await uploadAction({ filename: file.name });
      if (!response) {
        return;
      }
      const { url, nameKey } = await response.json();
      console.log('🚀 ~ handleImageUpload ~ url:', url, nameKey);

      // 2. 使用上传URL上传文件
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
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
      onFileAdded={(img) => getImageFileObject(img as any)}
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
