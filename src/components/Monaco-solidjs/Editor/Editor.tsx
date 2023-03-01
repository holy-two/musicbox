import loader, { Monaco } from "@monaco-editor/loader"
import { editor } from "monaco-editor"
import { createSignal, onCleanup, onMount } from "solid-js"
import useUpdate from "../hooks/useUpdate"
import MonacoContainer from "../MonacoContainer"
import { MonacoContainerProps } from "../MonacoContainer/MonacoContainer"


function Editor<T>(props: MonacoContainerProps<T>) {
  let containerRef: HTMLDivElement
  const [isEditorReady, setEditorReady] = createSignal(false)
  const [isMonacoMounting, setMonacoMounting] = createSignal(true)
  let monacoRef: Monaco
  let editorRef: editor.IStandaloneCodeEditor

  onMount(() => {
    const cancelable = loader.init()

    cancelable.then(monaco => {
      monacoRef = monaco
      setMonacoMounting(false)
    }).catch(console.log.bind(console))

    onCleanup(() => {
      if (!!editorRef) {
        disponseEditor()
      } else {
        cancelable.cancel()
      }
    })
  })



  function disponseEditor() {

  }


  return <MonacoContainer
    isEditorReady={isEditorReady()}
    loading={props.loading}
    width={props.width}
    height={props.height}
    class={props.class}
    wrapperProps={props.wrapperProps}
    ref={containerRef} />
}

export default Editor
