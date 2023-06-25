import { createEffect } from 'solid-js';
import abcjs from "abcjs";
import CursorControl from './cursorControl';


const ABCPlayer = (props: { musicData: string }) => {

  let staff: HTMLDivElement
  let paper: HTMLDivElement


  createEffect(async () => {
    const createSynth = new abcjs.synth.CreateSynth();
    const audioParams = { chordsOff: true };
    const playControl = new CursorControl(staff);
    const synthControl = new abcjs.synth.SynthController();
    const visual = abcjs.renderAbc(staff, props.musicData, {
      scale: 1,
      clickListener: (e) => { console.log(e) }
    });
    // 创建一个允许用户控制播放的可视化小部件
    synthControl.load(paper,
      playControl,
      {
        displayLoop: true,
        displayRestart: true,
        displayPlay: true,
        displayProgress: true,
        displayWarp: true
      })
    // 创建缓存和缓冲要播放的音频的对象
    try {
      await createSynth.init({ visualObj: visual[0] });
      await synthControl.setTune(visual[0], false, audioParams);
    } catch (error) {
      console.warn("Audio problem:", error);
    }
  })


  return (
    <div class='w-full overflow-y-scroll'>
      <div ref={staff} class='w-full h-full flex justify-around' />
      <div ref={paper} class='mb-10' />
    </div>
  );
};

export default ABCPlayer;
