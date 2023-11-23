import { Accessor, createEffect, on, createSignal } from 'solid-js';
import abcjs from "abcjs";
import CursorControl from './cursorControl';


const ABCPlayer = (props: { getMusicData: Accessor<string> }) => {

  let staff: HTMLDivElement;
  let paper: HTMLDivElement;
  const synth = new abcjs.synth.CreateSynth();
  let playControl: CursorControl;
  let control: abcjs.SynthObjectController;

  /**
   * 是否暂停播放
   */
  const [getIsPlaying, setIsPlaying] = createSignal(false);

  createEffect(on(props.getMusicData, async (musicData) => { 
    // 暂停上一个
    control?.pause?.(); // synth.stop();
    /**
     * 创建一个允许用户控制播放的可视化小部件
     * 需要暂停可见control变量内部有无法释放的引用 可以用缓存？`Map<musicData, control>.get(musicData)`
     */
    control = new abcjs.synth.SynthController();
    control.load(paper, playControl ??= new CursorControl(staff, {
      isPlaying: setIsPlaying
    }), {
      displayPlay: true,
      displayProgress: true,
    });
    const visual = abcjs.renderAbc(staff, musicData, {
      scale: 1,
      clickListener: (e) => { console.log(e) }
    });
    console.log(visual?.[0]?.getKeySignature?.());
    try {
      // 创建缓存和缓冲要播放的音频的对象
      await synth.init({ visualObj: visual[0] });
      await control.setTune(visual[0], false, {
        chordsOff: true,
        onEnded: () => setIsPlaying(false)
      });
      // await synth.prime();
    } catch (error) {
      console.warn("Audio problem:", error);
    }
  }))

  const handleButtonClick = () => control.play()


  return (
    <div class='w-full overflow-y-scroll'>
      <button onClick={handleButtonClick}>{
        getIsPlaying() ? '⏸' : '⏯️' // ▶️
      }</button>
      <div ref={staff} class='w-full h-full flex justify-around' />
      <div ref={paper} class='mb-10' />
    </div>
  );
};

export default ABCPlayer;
