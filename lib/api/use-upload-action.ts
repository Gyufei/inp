import { NextResponse } from 'next/server'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from '@/lib/r2'
import { R2_BUCKET_NAME } from '@/lib/const'

export async function useUploadAction({filename}: {filename: string}) {
 
  try {
    console.log("🚀 ~ uploadAction ~ process.env.R2_BUCKET_NAME:", R2_BUCKET_NAME)
    const nameKey = `${crypto.randomUUID().replace(/-/g, '')}-${filename}` 
    // 生成上传URL
    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME, 
        Key: `test/${nameKey}` ,    
      }),
      { expiresIn: 60 } 
    )

    
    // 返回上传URL
    return NextResponse.json({ url: signedUrl, nameKey })

  } catch (err) {
    console.log('出错了')
    console.log("🚀 ~ POST ~ err:", err)
  } 
}
export async function useDelAction({KeyFilename}: {KeyFilename: string}) {
 
  try {
    // 生成上传URL
    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME, 
        Key: `test/${KeyFilename}` ,    
      }),
      { expiresIn: 60 } 
    )
    
    // 返回上传URL
    return NextResponse.json({ url: signedUrl })

  } catch (err) {
    console.log("🚀 ~ POST ~ err:", err)
  } 
}