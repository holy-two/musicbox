import type { Monaco } from "@monaco-editor/loader"
import type { languages } from "monaco-editor"

export const noop = Function.prototype

export function getOrCreateModel(monaco: Monaco, value) {

}

export function getModel(monaco: Monaco, path: string) {
  return monaco.editor.getModel(createModelUri(monaco, path))
}

export function createModel(monaco: Monaco, value: string, language: string, path: string) {
  return monaco.editor.createModel(value, language, path && createModelUri(monaco, path))
}

export function createModelUri(monaco: Monaco, path: string) {
  return monaco.Uri.parse(path)
}

export function isUndefined(input: unknown): input is undefined {
  return input === undefined
}

export function ref<T>(value?: T) {
  return { value }
}
