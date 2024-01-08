import { AbcElem, KeySignature } from 'abcjs';


export function sleep(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function name(p: AbcElem['midiPitches'][number]) {
  const NAME = ['C', "C♯", 'D', "D♯", 'E', 'F', "F♯", 'G', "G♯", 'A', "A♯", 'B'][p.pitch % 12]
  const LEVEL = ~~((p.pitch) / 12) - 2 // 6 == 小字2组 == C4 中央C
  return `${NAME}${LEVEL}`
}

export function key(k: KeySignature){
  return `${k.root}${k.mode}`
}
