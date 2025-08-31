import abcjs from "abcjs"
import message from "𝄞/components/Message"

export function pathJoin(...path: string[]) {
  const all = [...path]
  let final = all.pop()
  for (const path of all.reverse()) {
    final = path + (path.at(-1) === "/" ? final : "/" + final)
  }
  return final
}

export function sleep(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

/**
 * 获取绝对音名
 * `NAME = C, LEVEL = 6` 表示 小字2组C 即软件库乐队里的C4
 */
export function name(p: abcjs.AbcElem["midiPitches"][number]) {
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
  ][p.pitch % 12]
  const LEVEL = ~~(p.pitch / 12) - 2
  return `${NAME}${LEVEL}`
}

/**
 * 获取调号 默认大调无后缀 小调后缀m 其他为古典调式
 */
export function key(k: abcjs.KeySignature) {
  return `${k.root}${k.mode}`
}

/**
 * 播放一拍
 */
export async function strike(e: abcjs.AbcElem) {
  abcjs.synth.playEvent(e.midiPitches, undefined, 1000)
  return message({
    content:
      e.midiPitches
        ?.map?.(pitch => name(pitch))
        .join(" ")
        .trim() || "⌒",
    primary: true,
  })
}
