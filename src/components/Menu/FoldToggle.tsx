import type { Signal } from "solid-js"
import unfold from "𝄞/assets/menu-unfold.svg?raw"
import fold from "𝄞/assets/menu-fold.svg?raw"
import classes from "./FoldToggle.module.styl"

const FoldToggle = (props: { collapsed: Signal<boolean> }) => {
  return (
    <button
      class={`na-button ${classes.button}`}
      innerHTML={fold + unfold}
      title="menu fold toggle"
      data-round
      onclick={() => props.collapsed[1](!props.collapsed[0]())}
    />
  )
}

export default FoldToggle
