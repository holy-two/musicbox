export interface MusicList {
  meta: ListMeta
  files: ListFile[]
}

interface ListMeta {
  sha: string
}

export interface ListFile {
  path: string
  mode: string
  sha: string
  size: number
}


export interface MusicFile {
  meta: MusicMeta
  file: MusicContents
}

export interface  MusicMeta {
  url: string
}

export interface MusicContents {
  contents: string
}
