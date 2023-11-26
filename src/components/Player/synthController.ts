import abcjs from "abcjs";

class SynthController extends abcjs.synth.SynthController {
    // get _randomAccess() {
    //     return (ev: PointerEvent) => {
    //         const button = ev.target as HTMLButtonElement;
    //         const background = button.classList.contains('abcjs-midi-progress-indicator') ? button.parentNode as HTMLElement : button;
    //         const percent = (ev.x - background.offsetLeft) / background.offsetWidth;
    //         const seek = Reflect.get(this, 'seek') as (percent: number) => void
    //         seek(percent)
    //         return Promise.resolve({ status: "ok" })
    //     }
    // }
    // set _randomAccess(self) { }
}

export default SynthController;
