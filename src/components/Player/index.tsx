import { Accessor, createEffect, on } from "solid-js"
import message from "𝄞/components/Message"
import abcjs from "abcjs"
import CursorControl from "./control"
import { name, key } from "𝄞/utils"
import "./index.styl"

const ABCPlayer = (props: { getMusicData: Accessor<string> }) => {
  let staff: HTMLDivElement
  let paper: HTMLDivElement
  const synth = new abcjs.synth.CreateSynth()
  let cursorControl: abcjs.CursorControl
  let synthControl: abcjs.SynthObjectController

  createEffect(
    on(props.getMusicData, async musicData => {
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
      const visual = abcjs.renderAbc(
        staff,
        musicData, //.replace(/^\|(?=\s*$)/m, ''),
        {
          scale: 1,
          clickListener: (e, t, c, a, d, event?: MouseEvent | TouchEvent) => {
            if (event.type !== "mouseup") return
            if (e.rest) return
            abcjs.synth.playEvent(e.midiPitches, undefined, 1000)
            e.midiPitches?.forEach?.(pitch => message(name(pitch)))
          },
        }
      )

      try {
        const keySignature = visual?.[0]?.getKeySignature?.()
        console.info(key(keySignature), keySignature)
        // 创建缓存和缓冲要播放的音频的对象
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

  return (
    <section class="na-layout overflow-x-hidden overflow-y-auto relative">
      <main
        ref={staff}
        class="na-layout-content flex justify-around overflow-unset!"
      />
      <footer ref={paper} class="na-layout-footer bottom-0 sticky" />
    </section>
  )
}

export default ABCPlayer
