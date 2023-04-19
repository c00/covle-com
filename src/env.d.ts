/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PRIVATE_SIB_KEY: string;
  readonly PRIVATE_TO_EMAIL: string;
  readonly PRIVATE_TO_NAME: string;
  readonly PRIVATE_FROM_NAME: string;
  readonly PRIVATE_FROM_EMAIL: string;
  readonly PRIVATE_MOCK_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}