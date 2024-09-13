import ImageUploader from './reactImageUploader'

const UploadImageList = ({onImageUpload, hideImg = false}: {
    onImageUpload: (file: File) => void,
    hideImg: boolean,
}) => {
  function getImageFileObject(imageFile: File) {
    console.log({ imageFile })
    onImageUpload(imageFile)
  }

  function runAfterImageDelete(file: File) {
    console.log({ file })
  }

  return (
    <ImageUploader
      onFileAdded={(img) => getImageFileObject(img)}
      onFileRemoved={(img) => runAfterImageDelete(img)}
      uploadIcon={<img className="tip-icon" src="/images/upload-image-add.svg" alt="" />}
      deleteIcon={null}
      style={{
        height: '140px',
        width: '140px',
        color: '#ffb200',
        backgroundColor: '#1014181a',
        border: '1px solid #ffffff80',
        borderRadius: '20px'
      }}
      hideImg={hideImg}
    />
  )
}

export default UploadImageList;