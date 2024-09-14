import fetcher from '@/lib/fetcher';
import { Paths } from '@/lib/PathMap';

export interface IAlbumUpload {
  server_id: number;
  album_list: Array<string>
}
export async function albumUpload({server_id, album_list}:IAlbumUpload) {

  try {
    await fetcher(
      Paths.albumUpload,
      {
        method: "POST",
        body: JSON.stringify({server_id, album_list}),
        headers: { "Content-Type": "application/json" },
      },
    );

    return true;
  } catch (e: any) {
    console.log("🚀 ~ e:", e)
    return false;
  }
}