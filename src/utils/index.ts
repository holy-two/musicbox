import { AbcElem, KeySignature } from "abcjs";

export function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * 获取绝对音名
 * `NAME = C, LEVEL = 6` 表示 小字2组C 即软件库乐队里的C4
 */
export function name(p: AbcElem["midiPitches"][number]) {
  const NAME = [
    "C",
    "C♯",
    "D",
    "D♯",
    "E",
    "F",
    "F♯",
    "G",
    "G♯",
    "A",
    "A♯",
    "B",
  ][p.pitch % 12];
  const LEVEL = ~~(p.pitch / 12) - 2;
  return `${NAME}${LEVEL}`;
}

/**
 * 获取谱号 默认大调无后缀 小调后缀m 其他为古典调式
 */
export function key(k: KeySignature) {
  return `${k.root}${k.mode}`;
}
