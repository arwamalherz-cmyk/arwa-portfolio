/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the portfolio API, e.g. http://localhost:4000/api */
  readonly VITE_API_URL?: string;
  /** When "false", the frontend calls the real API instead of bundled mock data. */
  readonly VITE_USE_MOCK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
