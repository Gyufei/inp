import { ReactNode, CSSProperties } from 'react'

interface FileObjectType {
  file: File
  dataUrl: string
}
interface FileUploaderProps {
  onFileAdded: ({ file, dataUrl }: FileObjectType) => any
  onFileRemoved?: ({ file, dataUrl }: FileObjectType) => any

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