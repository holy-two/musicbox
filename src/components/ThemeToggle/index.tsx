import type { Component } from "solid-js"
import moon from "𝄞/assets/moon.svg?raw"
import sun from "𝄞/assets/sun.svg?raw"
import toggle from "@holy-two/data-theme/dist/toggle"
import classes from "./index.module.styl"

export default (() => {
  return (
    <button
      class={`na-button ${classes.button}`}
      innerHTML={moon + sun}
      title="theme toggle"
      data-round
      onclick={toggle}
    />
  )
}) as Component
