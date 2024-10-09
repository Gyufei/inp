import fetcher from '@/lib/fetcher';
import { Paths } from '@/lib/PathMap';

export interface IAlbumUpload {
  server_id: number;
  server_logo: string;
}
export async function logoUpdate({ server_id, server_logo }: IAlbumUpload) {
  try {
    await fetcher(Paths.logoUpdate, {
      method: 'POST',
      body: JSON.stringify({ server_id, server_logo }),
      headers: { 'Content-Type': 'application/json' },
    });

    return true;
  } catch (e: any) {
    console.error('albumUpload', e);
    return false;
  }
}
