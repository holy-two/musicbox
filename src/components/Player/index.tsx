import { Accessor, createEffect, on, createSignal } from "solid-js";
import message from "𝄞/components/Message";
import abcjs from "abcjs";
import CursorControl from "./cursorControl";
import SynthController from "./synthController";
import { name, key } from "𝄞/utils";
import "./index.scss";

const ABCPlayer = (props: { getMusicData: Accessor<string> }) => {
  let staff: HTMLDivElement;
  let paper: HTMLDivElement;
  const synth = new abcjs.synth.CreateSynth();
  let playControl: abcjs.CursorControl;
  let control: abcjs.SynthObjectController;

  /**
   * 是否暂停播放
   */
  const [getIsPlaying, setIsPlaying] = createSignal(false);

  createEffect(
    on(props.getMusicData, async (musicData) => {
      // 暂停上一个
      control?.pause?.(); // synth.stop();
      /**
       * 创建一个允许用户控制播放的可视化小部件
       * 可视化小部件DOM不变故而只需要new一次
       */
      control = new SynthController();
      control.load(
        paper,
        (playControl ??= new CursorControl(staff, {
          isPlaying: setIsPlaying,
        })),
        {
          displayPlay: true,
          displayProgress: true,
        }
      );
      const visual = abcjs.renderAbc(
        staff,
        musicData, //.replace(/^\|(?=\s*$)/m, ''),
        {
          scale: 1,
          clickListener: (e, t, c, a, d, event?: MouseEvent | TouchEvent) => {
            if (event.type !== "mouseup") return;
            if (e.rest) return;
            abcjs.synth.playEvent(e.midiPitches, undefined, 1000);
            e.midiPitches?.forEach?.((pitch) => message(name(pitch)));
          },
        }
      );

      try {
        const KEY = key(visual?.[0]?.getKeySignature?.());
        console.info(`谱号为：${KEY}调`);
        // 创建缓存和缓冲要播放的音频的对象
        await synth.init({ visualObj: visual[0] });
        await control.setTune(visual[0], false, {
          chordsOff: true,
          onEnded: () => setIsPlaying(false),
        });
        // await synth.prime();
      } catch (error) {
        console.warn("Audio problem:", error);
      }
    })
  );

  // const handleButtonClick = () => control.play()

  return (
    <section class="na-layout overflow-x-hidden overflow-y-auto relative">
      {/*<button onClick={handleButtonClick}>{
        getIsPlaying() ? '⏸' : '⏯️' // ▶️
      }</button>*/}
      <main
        ref={staff}
        class="na-layout-content flex justify-around overflow-unset!"
      />
      <footer ref={paper} class="na-layout-footer bottom-0 sticky" />
    </section>
  );
};

export default ABCPlayer;
