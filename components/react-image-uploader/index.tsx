import React, { useState, ChangeEvent, useContext} from 'react'
import Image from 'next/image'
import { GlobalMsgContext } from '@/app/global-msg-context';
import { DeleteIcon, UploadIcon } from './icons'
import { FileUploaderProps, FileObjectType } from './interface'
import './index.css'

const ImageUploader = ({
  onFileAdded,
  onFileRemoved,
  uploadIcon,
  deleteIcon,
  style,
  hideImg = false
}: FileUploaderProps): JSX.Element => {
  const { setGlobalMessage } = useContext(GlobalMsgContext);

  const [currentImg, setCurrentImg] = useState<Partial<FileObjectType>>({
    file: {} as File,
    dataUrl: ''
  })

  const handleFilePicker = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target
   

    if (files != null && files.length > 0) {
      if (files[0].size > 31) {
        setGlobalMessage({
          type: 'error',
          message: 'The image size exceeds 3MB, please select again.',
        });
        return
      }
      const imageObject = {
        file: files[0],
        dataUrl: URL.createObjectURL(files[0])
      }
      setCurrentImg((oldImage) => {
        return { ...oldImage, ...imageObject }
      })
      if (onFileAdded) {
        onFileAdded(files[0])
      }
    }
  }

  const handleDeleteImage = (): void => {
    if (onFileRemoved != null && Object.keys(currentImg).length > 0) {
      const partialCurrentImg: Partial<FileObjectType> = currentImg
      const _currentImg: FileObjectType = partialCurrentImg as FileObjectType
      onFileRemoved(_currentImg.file)
    }
    setCurrentImg({})
  }
  return (
    <div className='uploader__container'>
      {/* button wrapper */}
      <div className='uploader__placeholder' style={style}>
        { deleteIcon !== null &&
          <div className='uploader__btn_wrapper'>
          <div className='uploader__btn' onClick={() => handleDeleteImage()}>
            <DeleteIcon icon={deleteIcon} />
          </div>
        </div>}

        {/* upload Input Box */}
        {currentImg && currentImg.dataUrl !== null && (
          <label id='file_uploader' className='uploader__file_input_label w-full'>
            <div className={ (currentImg.dataUrl && !hideImg) ? 'opacity-0' : 'opacity-100'}>
              <UploadIcon element={uploadIcon} />
            </div>
            {/* input element */}
            <input
              className='uploader__file_input'
              key={currentImg.dataUrl}
              type='file'
              name='upload'
              onChange={(e) => handleFilePicker(e)}
              accept='image/*'
              id='file_uploader'
            />
          </label>
        )}
        {/* image */}
        {(currentImg.dataUrl && !hideImg) && (
          <Image
            className='uploader__file'
            width={200}
            height={200}
            src={currentImg.dataUrl}
            alt={currentImg.dataUrl}
            loading='lazy'
          />
        )}
      </div>
    </div>
  )
}

export default ImageUploader
export type { FileUploaderProps, FileObjectType }