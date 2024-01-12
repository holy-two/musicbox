/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ABC_GITHUB_REPOSITORY_BASE_URL: string
  readonly VITE_ABC_DIRECTORY_PATH: string
  readonly VITE_INDEX_ABC_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
