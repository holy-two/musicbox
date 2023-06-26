import abcjs from "abcjs";
import { Setter } from 'solid-js'

function positionCursor(cursor: Element, x1: number, x2: number, y1: number, y2: number) {
  cursor?.setAttribute?.("x1", x1.toString());
  cursor?.setAttribute?.("x2", x2.toString());
  cursor?.setAttribute?.("y1", y1.toString());
  cursor?.setAttribute?.("y2", y2.toString());
}


class CursorControl implements abcjs.CursorControl {

  staff: Element
  lastSvg: SVGSVGElement | null
  beatSubdivisions: 2
  setFlags: {
    isReady?: Setter<Boolean>
    isPlaying: Setter<Boolean>
  }

  constructor(staff: Element, setFlags: {
    isReady?: Setter<Boolean>
    isPlaying: Setter<Boolean>
  }) {
    this.staff = staff;
    this.lastSvg = null;
    this.setFlags = setFlags
  }


  onReady() {
    this.setFlags.isReady?.(true)
  }


  onStart() {
    const svgs = this.staff.querySelectorAll('svg');
    svgs.forEach(svg => {
      // 创建一个line元素
      if (!svg.querySelector(".abcjs-cursor")) {
        const cursor = document.createElementNS("http://www.w3.org/2000/svg", "line");
        cursor.setAttribute("class", "abcjs-cursor");
        cursor.setAttributeNS(null, 'x1', '0');
        cursor.setAttributeNS(null, 'y1', '0');
        cursor.setAttributeNS(null, 'x2', '0');
        cursor.setAttributeNS(null, 'y2', '0');
        svg.appendChild(cursor);
      }
    })
    this.lastSvg = null;
    this.setFlags.isPlaying(true)
  }


  onBeat(beatNumber: number, totalBeats: number, totalTime: number) {
    console.log("Beat " + beatNumber + " is happening." + totalBeats + totalTime);
  }


  onEvent(event: abcjs.NoteTimingEvent) {
    if (event.measureStart && event.left === null) return; // this was the second part of a tie across a measure line. Just ignore it.

    // 当前操作的音符
    const lastSelection = this.staff.querySelectorAll("svg .highlight");
    for (let k = 0; k < lastSelection.length; k++)
      lastSelection[k].classList.remove("highlight");

    for (let i = 0; i < event.elements.length; i++) {
      const note = event.elements[i];
      for (let j = 0; j < note.length; j++) {
        note[j].classList.add("highlight");
      }
    }

    // 当前播放音符前的标记
    if (!(event.elements && event.elements.length > 0 && event.elements[0].length > 0)) return;
    const svg = event.elements[0][0].closest('svg')
    if (this.lastSvg === null) {
      this.lastSvg = svg;
    } else {
      if (this.lastSvg.parentElement && this.lastSvg.parentElement.offsetTop !== svg.parentElement.offsetTop) {
        positionCursor(this.lastSvg.querySelector(".abcjs-cursor"), 0, 0, 0, 0)
        this.lastSvg = svg;
      }
    }
    const cursor = svg.querySelector(".abcjs-cursor")
    positionCursor(cursor, event.left - 2, event.left - 2, event.top, event.top + event.height)
  }


  onFinished() {
    const els = this.staff.querySelectorAll("svg .highlight");
    for (let i = 0; i < els.length; i++) {
      els[i].classList.remove("highlight");
    }
    const cursor = this.staff.querySelector("svg .abcjs-cursor");
    positionCursor(cursor, 0, 0, 0, 0)

    this.setFlags.isPlaying(false)
  }

}


export default CursorControl;