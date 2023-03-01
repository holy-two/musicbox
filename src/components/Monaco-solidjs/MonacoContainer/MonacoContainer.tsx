import { JSXElement } from "solid-js"
import Loading from "../Loading"
import style from "./style.module.css"

export interface MonacoContainerProps<T extends {}> {
  width: string
  height: string
  loading: string | JSXElement
  isEditorReady: boolean
  class?: string
  wrapperProps?: T
  ref?: HTMLDivElement
}

function MonacoContainer<T extends {}>(
  props: MonacoContainerProps<T>
) {
  const {
    width, height, loading, isEditorReady, class: className, wrapperProps
  } = props

  return <section class={[style.wrapper].join(' ')} style={{
    width, height
  }} {...(wrapperProps ?? {})}>
    {!isEditorReady && <Loading>{loading}</Loading>}
    <div ref={props.ref} class={[
      style.fullWidth, isEditorReady ? '' : style.hide,
      className
    ].join(' ')}></div>
  </section>
}

export default MonacoContainer
