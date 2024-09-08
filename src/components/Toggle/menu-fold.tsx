import type { Signal } from "solid-js"
import unfold from "𝄞/assets/menu-unfold.svg?raw"
import fold from "𝄞/assets/menu-fold.svg?raw"
import classes from "./index.module.styl"

const FoldToggle = (props: { collapsed: Signal<boolean> }) => {
  return (
    <button
      class={`na-button ${classes["menu-fold-button"]}`}
      innerHTML={fold + unfold}
      title="menu fold toggle"
      data-round
      onclick={() => props.collapsed[1](!props.collapsed[0]())}
    />
  )
}

export default FoldToggle
