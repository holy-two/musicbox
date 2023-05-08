import { Component, createSignal, onMount } from 'solid-js';
import abcjs from "abcjs";
import './index.scss'
import CursorControl from './until/CursorControl';

const ABCMusic: Component = () => {
  const [visualArr, setVisualArr] = createSignal({} as abcjs.TuneObjectArray)
  const createSynth = new abcjs.synth.CreateSynth();
  const audioParams = { chordsOff: true };
  const cursorControl = new CursorControl("#staff");
  const synthControl = new abcjs.synth.SynthController();

  onMount(() => {
    setVisualArr(abcjs.renderAbc('staff', `%abc-2.2
X: 1
T: 明かされる深秘
Q: "Allegro"
M: 4/4
L: 1/4
K: F
|z2E/D/E/G/|[DA]G/A/E>C|D/E/F/G/DF/G/|
|[DA]D[EG]F/E/|!<(! [DF]3 !<)! !mp! [EA]/c/|[Fd]f/e/[Ec]>A|
|[^CEG]/A/^c/d/[Fd][Gd]/e/|!<(! [Af][Bg]/f/ [ce]/d/ [Ac]|!<)! d4 & !mf![FA]/>[FA]>[FA] [G=B]/>[GB]>[GB]|
|[Ac]/>[Ac]>[Ac] [G=B]/>[GB]>[GB]|[FA]/>[FA]>[FA] [G=B]/>[GB]>[GB]|[Ac]/>[Ac]>[Ac] [=Bd]/>[Bd]>D|
|[FA][A,D]/[FA]/[G=B][DG]|[DA]>G/F//[DG][A,D]/[CE]/|[DF][EG]/[DF]/[CE][G,C]|
|[A,D]>E/F//[CE]>[CE]|[DF][FA]/[Ac]/[=Bd][GB]|[Ac]>=B/A//[EG][EG]/B/|
|[FA]/[G=B]/[Ac]/[FA]/ [GB]/[DG]/[=B,E]/[DG]/|A2`, { scale: 1, clickListener: (e) => { console.log(e) } }));
    // 创建一个允许用户控制播放的可视化小部件
    synthControl.load("#paper",
      cursorControl,
      {
        displayLoop: true,
        displayRestart: true,
        displayPlay: true,
        displayProgress: true,
        displayWarp: true
      }
    );
    // 创建缓存和缓冲要播放的音频的对象
    createSynth.init({ visualObj: visualArr()[0] })
      .then(() => {
        synthControl.setTune(visualArr()[0], false, audioParams)
          .then(() => {
            console.log("Audio successfully loaded.")
          }).catch(error => {
            console.warn("Audio problem:", error);
          });
      }).catch(error => {
        console.warn("Audio problem:", error);
      });
  })

  return (
    <>
      <div id='staff' />
      <div id="paper" />
    </>
  );
};

export default ABCMusic;
