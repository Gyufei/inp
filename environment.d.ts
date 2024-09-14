declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_IS_PREVIEW: string;

    readonly NEXT_PUBLIC_R2_ACCESS_KEY_ID: string;
    readonly NEXT_PUBLIC_R2_SECRET_ACCESS_KEY: string;
    readonly NEXT_PUBLIC_R2_BUCKET_NAME: string;
    readonly NEXT_PUBLIC_R2_ACCOUNT_ID: string;
    readonly NEXT_PUBLIC_R2_URl_HOST: string;
  }
}
