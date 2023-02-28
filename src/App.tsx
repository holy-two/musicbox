import { Component,onMount } from 'solid-js';
import './App.scss';
import abcjs from "abcjs";

const App: Component = () => {
  onMount(()=>{
    abcjs.renderAbc('paper', 'X:1\nK:D\nDD AA|BBA2|\n', { scale: 1.5 });
  })
  return (
    <>
      <div id="paper">123</div>
    </>
  );
};

export default App;
