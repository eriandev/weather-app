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
    VITE_BASE_URL: string;
    VITE_RAPIAPI_KEY: string;
    VITE_RAPIAPI_HOST: string;
  }
}

export {};
