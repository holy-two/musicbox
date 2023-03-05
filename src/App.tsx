import { Component, createSignal, onMount } from 'solid-js';
import './App.scss';
import ABCJS from "abcjs";

const App: Component = () => {
  const [visualArr, setVisualArr] = createSignal({} as ABCJS.TuneObjectArray)
  const createSynth = new ABCJS.synth.CreateSynth();
  const audioParams = { chordsOff: true };

  const CursorControl = function () {
    this.beatSubdivisions = 2;
    this.onStart = function () {
      console.log("The tune has started playing.");
    }
    this.onFinished = function () {
      console.log("The tune has stopped playing.");
    }
    this.onBeat = function (beatNumber) {
      console.log("Beat " + beatNumber + " is happening.");
    }
    this.onEvent = function (event) {
      console.log("An event is happening", event);
    }
  }

  const cursorControl = new CursorControl();
  const synthControl = new ABCJS.synth.SynthController();

  onMount(() => {
    setVisualArr(ABCJS.renderAbc('staff', 'X:1\nK:D\nDD AA|BBA2|\n', { scale: 1.5 }));

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
  })

  const init = () => {
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
  }

  return (
    <>
      <div id='staff'></div>
      <div id="paper">123</div>
      <button id='clickme' onclick={init}>init</button>
    </>
  );
};

export default App;
