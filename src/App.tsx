import { Component,onMount } from 'solid-js';
import './App.scss';
import abcjs from "abcjs";

const App: Component = () => {
  onMount(()=>{
    abcjs.renderAbc('paper', 'X:1\nK:D\nDD AA|BBA2|\n', { scale: 1.5 });
  })
  return (
    <>
      <div text-10 text-red scale-30>unocss test</div>
      <div id="paper">123</div>
    </>
  );
};

export default App;
