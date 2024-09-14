import { NextResponse } from 'next/server'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from '@/lib/r2'

export async function uploadAction({filename}: {filename: string}) {
  try {
    const nameKey = `${crypto.randomUUID().replace(/-/g, '')}-${filename}` 
    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME, 
        Key: `test/${nameKey}` ,    
      }),
      { expiresIn: 60 } 
    )

    
    // 返回上传URL
    return NextResponse.json({ url: signedUrl, nameKey })

  } catch (err) {
    return NextResponse.json({ err })
  } 
}
export async function delAction({KeyFilename}: {KeyFilename: string}) {
  try {
    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME, 
        Key: `test/${KeyFilename}` ,    
      }),
      { expiresIn: 60 } 
    )
    return NextResponse.json({ url: signedUrl })
  } catch (err) {
    return NextResponse.json({ err })
  } 
}