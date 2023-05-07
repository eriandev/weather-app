// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }

  interface ImportMetaEnv {
    readonly RAPIAPI_KEY: string
    readonly RAPIAPI_URL: string
    readonly RAPIAPI_HOST: string
    readonly PUBLIC_BASE_URL: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export {};
