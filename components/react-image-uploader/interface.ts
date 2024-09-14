import { ReactNode, CSSProperties } from 'react'

interface FileObjectType {
  file: File
  dataUrl: string
}
interface FileUploaderProps {
  onFileAdded: (file: File) => any
  onFileRemoved?: (file: File) => any

  uploadIcon?: ReactNode
  deleteIcon?: ReactNode
  style?: CSSProperties
  hideImg?: boolean
}
interface UploadIconProp {
  element?: ReactNode
}

interface DeleteIconProps {
  icon?: ReactNode
}

export type {
  FileObjectType,
  FileUploaderProps,
  UploadIconProp,
  DeleteIconProps
}