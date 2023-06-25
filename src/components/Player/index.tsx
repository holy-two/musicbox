import { Accessor, createEffect, on, createSignal } from 'solid-js';
import abcjs from "abcjs";
import CursorControl from './cursorControl';


const ABCPlayer = (props: { getMusicData: Accessor<string> }) => {

  let staff: HTMLDivElement;
  // let paper: HTMLDivElement
  const synth = new abcjs.synth.CreateSynth();
  // const synthControl = new abcjs.synth.SynthController();
  let playControl: CursorControl;

  /**
   * 是否播放存在播放进度
   */
  const [getIsMouStart, setIsMouStart] = createSignal(false);
  /**
   * 是否暂停播放
   */
  const [getIsPlaying, setIsPlaying] = createSignal(false);

  createEffect(on(props.getMusicData, async (musicData) => {
    synth.stop();
    setIsMouStart(false);
    setIsPlaying(false);
    playControl ??= new CursorControl(staff);
    const visual = abcjs.renderAbc(staff, musicData, {
      scale: 1,
      clickListener: (e) => { console.log(e) }
    });
    // 创建一个允许用户控制播放的可视化小部件
    /* synthControl.load(paper, playControl, {
      displayLoop: true,
      displayRestart: true,
      displayPlay: true,
      displayProgress: true,
      displayWarp: true
    }) */
    // 创建缓存和缓冲要播放的音频的对象
    try {
      await synth.init({ visualObj: visual[0] });
      // await synthControl.setTune(visual[0], false, { chordsOff: true });
      await synth.prime();
    } catch (error) {
      console.warn("Audio problem:", error);
    }
  }))

  const handleButtonClick = () => {
    if (getIsMouStart()) {
      if (getIsPlaying()) {
        synth.pause();
        setIsPlaying(false);
      } else {
        synth.resume();
        setIsPlaying(true);
      }
    } else {
      synth.start()
      setIsMouStart(true);
      setIsPlaying(true);
    }
  }


  return (
    <div class='w-full overflow-y-scroll'>
      <button onClick={handleButtonClick}>{
        getIsPlaying() ? '⏸' : '⏯️' // ▶️
      }</button>
      <div ref={staff} class='w-full h-full flex justify-around' />
      {
        // <div ref={paper} class='mb-10' />
      }
    </div>
  );
};

export default ABCPlayer;
