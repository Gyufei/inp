import { NextResponse } from 'next/server';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2 } from '@/lib/r2';
import { R2_BUCKET_NAME } from '@/lib/const';
import { isProduction } from '../PathMap';

export async function uploadAction(nameKey: string) {
  try {
    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: `${isProduction ? 'production' : 'test'}/${nameKey}`,
      }),
      { expiresIn: 60 }
    );

    // 返回上传URL
    return NextResponse.json({ url: signedUrl });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
export async function delAction({ keyFilename }: { keyFilename: string }) {
  const deleteParams = {
    Bucket: R2_BUCKET_NAME, // The name of your bucket
    Key: `${isProduction ? 'production' : 'test'}/${keyFilename}`, // The name of the file you want to delete
  };

  try {
    await r2.send(new DeleteObjectCommand(deleteParams));
    console.log(`File ${keyFilename} deleted successfully.`);
    return true;
  } catch (error) {
    console.error('Error deleting file: ', error);
    throw error;
  }
}
