import { Accessor, createEffect, on, onCleanup } from "solid-js"
import abcjs from "abcjs"
import CursorControl from "./control"
import { key, strike } from "𝄞/utils"
import "./index.styl"

const ABCPlayer = (props: { ABCAccessor: Accessor<string> }) => {
  let staff: HTMLDivElement
  let paper: HTMLDivElement
  const synth = new abcjs.synth.CreateSynth()
  let cursorControl: abcjs.CursorControl
  let synthControl: abcjs.SynthObjectController
  let visual: abcjs.TuneObjectArray

  createEffect(
    on(props.ABCAccessor, async ABCString => {
      // 暂停上一个
      synthControl?.pause?.() // synth.stop();
      /**
       * 创建一个允许用户控制播放的可视化小部件
       * 可视化小部件DOM不变故而只需要new一次
       */
      synthControl = new abcjs.synth.SynthController()
      synthControl.load(paper, (cursorControl ??= new CursorControl(staff)), {
        displayPlay: true,
        displayProgress: true,
      })
      visual = abcjs.renderAbc(
        staff,
        ABCString, //.replace(/^\|(?=\s*$)/m, ''),
        {
          scale: 1,
          clickListener: (e, t, c, a, d, event?: MouseEvent | TouchEvent) => {
            // e === visual[0].engraver?.dragTarget?.absEl?.abcelem 会缓存上一次的e
            if (event.type !== "mouseup") return
            if (e.rest) return
            strike(e)
          },
          // oneSvgPerLine: true,
          viewportVertical: true,
          responsive: "resize",
        }
      )

      try {
        const keySignature = visual?.[0]?.getKeySignature?.()
        console.info(key(keySignature), keySignature)
        await synth.init({ visualObj: visual[0] })
        await synthControl.setTune(visual[0], false, {
          chordsOff: true,
          onEnded: () => {},
        })
        // await synth.prime();
      } catch (error) {
        console.warn("Audio problem:", error)
      }
    })
  )

  // const handlePlayButtonToggle = () => synthControl.play();

  function handleNoteKeyup(e: KeyboardEvent) {
    if (document.activeElement == document.body) {
      if (e.key === "Enter" && visual[0].engraver.selected.length) {
        const g: abcjs.AbsoluteElement = visual[0].engraver.selected[0]
        if (g.type === "note") strike(g.abcelem)
        g.elemset?.[0]?.scrollIntoView?.({
          behavior: "smooth",
          block: "center",
        })
      }
    }
  }

  window.addEventListener("keyup", handleNoteKeyup)
  onCleanup(() => window.removeEventListener("keyup", handleNoteKeyup))

  return (
    <section class="na-layout overflow-x-hidden overflow-y-auto relative">
      <main ref={staff} class="na-layout-content overflow-unset! select-none" />
      <footer ref={paper} class="na-layout-footer bottom-0 sticky" />
    </section>
  )
}

export default ABCPlayer
