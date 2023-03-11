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
    setVisualArr(abcjs.renderAbc('staff', `X: 1
T: Cooley's
M: 4/4
L: 1/8
R: reel
K: Emin
|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|
EBBA B2 EB|B2 AB defg|afe^c dBAF|DEFD E2:|
|:gf|eB B2 efge|eB B2 gedB|A2 FA DAFA|A2 FA defg|
eB B2 eBgB|eB B2 defg|afe^c dBAF|DEFD E2:|`, { scale: 1, clickListener: (e) => { console.log(e) } }));
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
