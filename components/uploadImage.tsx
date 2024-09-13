import Image from 'next/image'
import ImageUploader from './reactImageUploader'
import { useUploadAction } from "@/lib/api/use-upload-action";
import { R2_URl_HOST } from '@/lib/const'

const UploadImageList = ({onImageUpload, hideImg = false}: {
    onImageUpload: (url: string) => void,
    hideImg: boolean,
}) => {
  async function getImageFileObject(imageFile: File) {
    const file = imageFile.file
    console.log({ imageFile })
    try {
     
      const response = await useUploadAction({filename: file.name});
      const { url, nameKey} = await response?.json()
      console.log("🚀 ~ handleImageUpload ~ url:", url, nameKey)
      
      // 2. 使用上传URL上传文件 
      await fetch(url, {  
        method: 'PUT',
        headers: {
          'Content-Type':file.type,
        },
        body: file,
      })
      console.log('Image uploaded successfully!');
      onImageUpload(`${R2_URl_HOST}/test/${nameKey}`)
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  function runAfterImageDelete(file: File) {
    console.log({ file })
  }

  return (
    <ImageUploader
      onFileAdded={(img) => getImageFileObject(img)}
      onFileRemoved={(img) => runAfterImageDelete(img)}
      uploadIcon={<Image src="/icons/add.svg" width={140} height={140} alt="" />}
      deleteIcon={null}
      style={{
        height: '140px',
        width: '140px',
        color: '#ffb200',
        backgroundColor: '#1014181a',

      }}
      hideImg={hideImg}
    />
  )
}

export default UploadImageList;