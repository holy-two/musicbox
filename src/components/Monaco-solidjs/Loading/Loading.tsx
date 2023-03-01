import { ParentProps } from "solid-js"
import style from "./style.module.css"

function Loading(props: ParentProps) {
  return <div class={style.loading}>
    {props.children}
  </div>
}

export default Loading
